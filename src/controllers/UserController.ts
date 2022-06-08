import Sequelize from "sequelize";
import User from '../../models/user';
import bcrypt from "../utils/bcrypt";
import auth from '../utils/auth';
import otp from '../utils/otp';
import mail from '../utils/mail';
import {
	LoginRequest, 
	SignupLoginResponse, 
	SignupRequest,
	forgotPasswordAndOTPResponse,
	forgotPasswordOTPRequest,
	forgotPasswordRequest
} from '../resources/user';

const UserController = () => {
    const signup = async (req: SignupRequest, res: SignupLoginResponse) => {
        const { body } = req;

        try {
          const email = body.email ? body.email.toLowerCase():" ";
          
          const existing: User | null = await User.findOne({
            where: {
              [Sequelize.Op.or]: [
                { email: email},
                { phone: body.phone }
              ]
            }
          });

          if (existing) return res.status(400).json({ message: `${email} or ${body.phone} was already used in other accounts`});
		  
		  const password = bcrypt().password(body);
		  const data:any = {
            email: email,
            password: password,
			firstName: body.email,
			lastName: body.lastName,
			phone: body.phone
          }

          let user: User = await User.create(data);
      
          const token = auth().issue({ id: user.id });
    
          return res.status(200).json({
            message: "Successfully Registered",
            user,
            token
          });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ message: "Internal server error" });
        }
    };

    const login = async (req: LoginRequest, res: SignupLoginResponse) => {
        const { password } = req.body;
        const email = req.body.email ? req.body.email.toLowerCase():"";
    
        if (email && password) {
          try {
            let user: User | null = await User.findOne({
              where: {
                email: email
              }
            });
            
            if (!user) return res.status(400).json({ message: "Bad Request: User not found" });
    
            if (bcrypt().comparePassword(password, user.password as string)) {
              const token = auth().issue({ id: user.id });
    
              return res.status(200).json({
                message: "Login Success",
                user,
                token
              });
            }
            return res.status(401).json({ message: "Unauthorized" });
          } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Internal server error" });
          }
        }
    
        return res.status(400).json({ message: "Bad Request: Email or password is wrong" });
    };

	const forgotPasswordOTP = async (req: forgotPasswordOTPRequest, res: forgotPasswordAndOTPResponse) => {
		const { body } = req;
		try {
			const user: User | null = await User.findOne({
				where: {
					email: body.email
				}
			});
			if (!user) return res.status(404).json({message:"There are no user accounts associated with that email"});
	
			const otpCode = await otp();
			await user.update({ otpCode: otpCode });
			//await mail(user.email as string,otpCode)

			return res.status(200).json({
				message: "OTP generated.",
				otpCode: otpCode 
			});

		} catch (err) {
		  console.log(err);
		  return res.status(500).json({ message: "Internal server error" });
		}
	};

	const forgotPassword = async (req: forgotPasswordRequest, res: forgotPasswordAndOTPResponse) => {
		try{
			const { email, otpCode } = req.body;
			const existing: User | null = await User.findOne({
				where: {
					otpCode,
					email
				}
			});
		
			if (!existing) return res.status(403).json({ message: "Invalid Code" });
			const passwordMaked = bcrypt().password(req.body);
			if(!passwordMaked) return res.status(400).json({ message: "Passowrd is not maked"});
			await existing.update({ password: passwordMaked, otpCode: null });
		
			return res.status(200).json({
				message: "Passowrd Updated Succesfully",
			});
		}catch (err) {
		  console.log(err);
		  return res.status(500).json({ message: "Internal server error"});
		}
	  };

    return {
        signup,
        login,
		forgotPasswordOTP,
		forgotPassword
    };
}

export default UserController;
