const express = require('express');
const router = express.Router();
const schemas = require('../../models/user'); // Adjust the path as necessary
const { validateAuth } = require('../../middlewares/validateAuth');
const controllers = require('../../controllers/auth'); // Adjust the path as necessary

const validateLogin = (req, res, next) => {
  const { error } = schemas.loginSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};

router.post('/', express.json(), validateAuth, controllers.auth);
router.post('/login', express.json(), controllers.login);

module.exports = router;
