import auth from './auth';
import { Request, Response, NextFunction } from "express";

// usually: "Authorization: Bearer [token]"
const mw = async(req: Request, res: Response, next: NextFunction) => {
  let tokenToVerify:string;
  const authorization:string = req.header("Authorization") as string;
  
  if (authorization) {
    const parts = authorization.split(" ");
  
    if (parts.length === 2) {
      const scheme = parts[0];
      const credentials = parts[1];
  
      if (/^Bearer$/.test(scheme)) {
        tokenToVerify = credentials;
      } else {
        return res
          .status(401)
          .json({ msg: "Format for Authorization: Bearer [token]" });
      }
    } else {
      return res
        .status(401)
        .json({ msg: "Format for Authorization: Bearer [token]" });
    }
  } else if (req.body.token) {
    tokenToVerify = req.body.token;
    delete req.query.token;
  } else {
    return res.status(401).json({ msg: "No Authorization was found" });
  }
  
  return auth().verify(tokenToVerify, (err:any, thisToken:any) => {
    if (err) return res.status(401).json({ err });
    
    req.headers.authorization = thisToken;
    return next();
  });
};

export default mw;