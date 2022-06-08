import bcrypt from "bcryptjs";

const bcryptService = () => {
    const password = (user:any) => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(user.password, salt);
  
      return hash;
    };
  
    const comparePassword = (pw:string, hash:string) => bcrypt.compareSync(pw, hash);
  
    const passwordString = (pw:string) => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(pw, salt);
  
      return hash;
    };
  
    return {
      password,
      comparePassword,
      passwordString
    };
  };
  
  export default bcryptService;