//core
const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation
const dotenv = require('dotenv');
//other
const controllersWrapper = require('../helpers/controllerWrapper'); // Adjust the path as necessary
const getHttpError = require('../helpers/getHttpError'); // Adjust the path as necessary
const { User } = require('../models/user'); // Import the book model
//const { SECRET_KEY } = process.env; // Assuming you have environment variables set for JWT secret
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const SECRET_KEY = 'hgihaihvbabv';
dotenv.config(); // Load environment variables from .env file

const auth = async (req, res) => {
  const { email, password } = req.body;
  const emailExists = await User.findOne({ email });

  if (emailExists) {
    throw getHttpError(409, 'Email already in use Buster!!!');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  req.body.password = hashedPassword;

  const newUser = await User.create(req.body);
  res.status(201).json({
    message: 'User created successfully',
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw getHttpError(401, 'Fucking email or password is wrong');

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare)
    throw getHttpError(401, 'Fucking email or password is wrong');

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

  res.status(200).json({
    message: 'Login successful',
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      token,
    },
  });
};
module.exports = {
  auth: controllersWrapper(auth),
  login: controllersWrapper(login),
};
