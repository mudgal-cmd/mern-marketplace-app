import bcryptjs from "bcryptjs";

export const hashPassword = (password, salt) =>{

  const hashedPwd = bcryptjs.hashSync(password, salt);

  return hashedPwd;

}