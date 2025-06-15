const handleMongooseError = () => {
  error.status = 400; // Set a custom status code for validation errors
  next();
};

module.exports = handleMongooseError;
