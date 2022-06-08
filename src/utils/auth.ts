import jwt from "jsonwebtoken";

let secret = process.env.NODE_ENV === "production" ? process.env.JWT_SECRET : "secret";

const authService = () => {
  const issue = (payload:any) => jwt.sign(payload,secret="secret", {});
  const verify = (token:any, cb:any) => jwt.verify(token,secret="secret", {}, cb);

  return {
    issue,
    verify
  };
};

export default authService;