const boom = require('@hapi/boom');

const validateHandler = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property], { abortEarly: false });

    if (error) {
      next(boom.badRequest(error));
    } else {
      next();
    }
  };
};

module.exports = validateHandler;
