const { Schema, model } = require('mongoose');
const handleMongooseError = require('../helpers/handleMongooseError');
const Joi = require('joi'); // Validation library

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    favorite: { type: Boolean, default: false },
    read: { type: Boolean, default: false },
    genre: {
      type: String,
      required: true,
      enum: [
        'fantasy',
        'science fiction',
        'mystery',
        'romance',
        'horror',
        'non-fiction',
      ],
    },
    date: {
      type: String,
      required: true,
      match: /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD format
      validate: {
        validator: function (v) {
          const date = new Date(v);
          return !isNaN(date.getTime()); // Check if the date is valid
        },
        message: (props) => `${props.value} is not a valid date!`,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

bookSchema.post('save', handleMongooseError);

const validationSchema = Joi.object({
  title: Joi.string().required(), // Title is required
  author: Joi.string().required(), // Author is required
  genre: Joi.string()
    .required()
    .valid(
      'fantasy',
      'science fiction',
      'mystery',
      'romance',
      'horror',
      'non-fiction'
    ),
  date: Joi.string()
    .required()
    .pattern(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD format
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(), // Favorite field is required and must be a boolean
});

const Book = model('Book', bookSchema);
module.exports = { Book, validationSchema, updateFavoriteSchema };
