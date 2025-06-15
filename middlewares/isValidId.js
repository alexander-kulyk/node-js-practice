const { isValidObjectId } = require('mongoose');

const { getHttpError } = require('../helpers/getHttpError');

const isValidId = (req, resp, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    return next(getHttpError(400, `Invalid ID format: ${id}`));
  }
  next();
};

module.exports = isValidId;
