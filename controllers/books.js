//other
const controllersWrapper = require('../helpers/controllerWrapper'); // Adjust the path as necessary
const { getHttpError } = require('../helpers/getHttpError'); // Adjust the path as necessary
const { validationSchema, Book } = require('../models/book'); // Import the book model

const getAll = async (req, resp, next) => {
  //const result = await books.getAll();
  const result = await Book.find({ title: 'Motherfucker' });
  resp.json(result);
};

const getById = async (req, resp, next) => {
  const { id } = req.params;
  //const book = await books.getById(id);

  //const book = await Book.findOne({ _id: id });
  const book = await Book.findById(id);

  if (!book) {
    throw getHttpError(404, 'Book not found');
  }

  resp.json(book);
};

const add = async (req, resp) => {
  const { error } = validationSchema.validate(req.body);
  if (!!error) {
    return resp.status(400).json({ message: error.message });
  }
  const result = await Book.create(req.body);
  resp.status(201).json(result);

  // const newBook = await books.add(req.body);
  // resp.status(201).json(newBook);
};

const updateById = async (req, resp, next) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (!!error) {
      return resp.status(400).json({ message: error.message });
    }
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      throw getHttpError(404, 'Book not found');
    }

    resp.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

const updateFavorite = async (req, resp, next) => {
  try {
    const { error } = updateFavoriteSchema.validate(req.body);
    if (!!error) {
      return resp.status(400).json({ message: error.message });
    }
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      throw getHttpError(404, 'Book not found');
    }

    resp.json(updatedBook);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, resp, next) => {
  const { id } = req.params;
  //const deletedBooks = await books.deleteById(id);
  const deletedBooks = await Book.findByIdAndDelete(id);
  // If no book was found and deleted, throw a 404 error
  if (!deletedBooks) {
    throw getHttpError(404, 'Book not found');
  }
  resp.status(201).send('Item deleted successfully');
};

module.exports = {
  getAll: controllersWrapper(getAll),
  getById: controllersWrapper(getById),
  add: controllersWrapper(add),
  updateById: controllersWrapper(updateById),
  updateFavorite: controllersWrapper(updateFavorite),
  deleteById: controllersWrapper(deleteById),
};
