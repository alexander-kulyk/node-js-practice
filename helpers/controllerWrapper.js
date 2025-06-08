const controllerWrapper = (controller) => {
  const getWrapper = async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      next(error);
    }
  };

  return getWrapper;
};

module.exports = controllerWrapper;
