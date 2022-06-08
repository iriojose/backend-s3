import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'irio@roscoeholdings.com',
        pass: 'irio26'
    }
});


const sendMail = async(email:string,otp:string|number) => {
    var mailOptions = {
        from: 'Remitente',
        to: `${email}`,
        subject: 'Asunto',
        text: `${otp}`
    };

    const res = await transporter.sendMail(mailOptions);
    return res;
}

export default sendMail;