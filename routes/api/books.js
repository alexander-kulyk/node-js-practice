//core
const express = require('express');
const Joi = require('joi'); // Validation library
//other
const books = require('../../books'); // Adjust the path as necessary
const controllers = require('../../controllers/books'); // Adjust the path as necessary

const validationSchema = Joi.object({
  title: Joi.string().required(), // Title is required
  author: Joi.string().required(), // Author is required
});

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:id', controllers.getById);

router.post('/', express.json(), controllers.add);

router.put('/:id', express.json(), controllers.updateById);

router.delete('/:id', controllers.deleteById);

module.exports = router;
