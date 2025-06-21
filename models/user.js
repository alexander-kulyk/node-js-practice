const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');
const Joi = require('joi'); // Validation library

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      minlength: 2, // Minimum length for name
      maxlength: 50, // Maximum length for name
    },
    lastName: {
      type: String,
      required: true,
      minlength: 2, // Minimum length for name
      // Maximum length for name
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
      // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    },
  },
  {
    versionKey: false,
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

userSchema.post('save', handleMongooseError);

const authSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required(),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    .required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .required(),
  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    .required(),
});

const schemas = {
  authSchema,
  loginSchema,
};

const User = model('user', userSchema);

module.exports = {
  User,
  schemas,
};
