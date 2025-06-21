const { schemas } = require('../models/user');

const validateAuth = (req, res, next) => {
  const { error } = schemas.authSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

module.exports = { validateAuth };
