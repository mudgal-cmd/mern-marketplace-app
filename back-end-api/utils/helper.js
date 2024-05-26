import bcryptjs from "bcryptjs";

export const hashPassword = (password, salt) =>{

  const hashedPwd = bcryptjs.hashSync(password, salt);

  return hashedPwd;

}

export const validatePassword = (inputPassword, hashedPassword) =>{

  const passwordCompareResult = bcryptjs.compareSync(inputPassword, hashedPassword);

  return passwordCompareResult;

}