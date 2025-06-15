//core
const express = require('express');
const Joi = require('joi'); // Validation library
//other
const controllers = require('../../controllers/books'); // Adjust the path as necessary
const isValidId = require('../../middlewares/isValidId');

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:id', isValidId, controllers.getById);

router.post('/', express.json(), controllers.add);

router.put('/:id', express.json(), isValidId, controllers.updateById);

router.patch(
  '/:id/favorite',
  express.json(),
  isValidId,
  controllers.updateFavorite
);

router.delete('/:id', isValidId, controllers.deleteById);

module.exports = router;
