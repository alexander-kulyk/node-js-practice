const getHttpError = (statusCode, message) => {
  const error = new Error(message);
  error.status = statusCode;
  return error;
};

module.exports = getHttpError;
