export const errorHandler = (statusCode, message) =>{
  
  const error = new Error ();

  console.log("error from error handler");

  error.statusCode = statusCode;

  error.message = message;

  return error;

}
// This custom error handler function will be used to handle special errors like - "Password is not long enough".