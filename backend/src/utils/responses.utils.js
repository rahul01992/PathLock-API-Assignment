// success response for api requests (passing response object, response message, response data if any ) in the function parameters
export const SuccessResponse = (res, message, data = null, users) => {
  // returning the response object with 200 status code and json body containing success flag as true, response message and data
  return res
    .status(200)
    .json({ success: true, message: message, data: data, users: users });
};

// error response for api requests (passing response object, status code, response message, response data if any ) in the function parameters
export const ErrorResponse = (res, statusCode, message, data = null) => {
  // returning the response object with specified status code and json body containing success flag as false, response message and data
  return res
    .status(statusCode)
    .json({ success: false, message: message, data: data });
};
