//core
const express = require('express');
const Joi = require('joi'); // Validation library
//other
const books = require('../books'); // Adjust the path as necessary
const controllersWrapper = require('../helpers/controllerWrapper'); // Adjust the path as necessary
const { getHttpError } = require('../helpers'); // Adjust the path as necessary

const validationSchema = Joi.object({
  title: Joi.string().required(), // Title is required
  author: Joi.string().required(), // Author is required
});

const getAll = async (req, resp, next) => {
  const result = await books.getAll();
  resp.json(result);
};

const getById = async (req, resp, next) => {
  const { id } = req.params;
  const book = await books.getById(id);

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
  const newBook = await books.add(req.body);
  resp.status(201).json(newBook);
};

const updateById = async (req, resp, next) => {
  try {
    const { error } = validationSchema.validate(req.body);
    if (!!error) {
      return resp.status(400).json({ message: error.message });
    }
    const { id } = req.params;
    const updatedBook = await books.updateById(id, req.body);
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
  const deletedBooks = await books.deleteById(id);
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
  deleteById: controllersWrapper(deleteById),
};
