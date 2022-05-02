const joi = require('joi');

const schemas = joi.object({
      name: joi.string().min(3).required(),
      // token: [joi.string(), joi.number()],
      // age: joi.number().integer().min(18).required(),
      // talk: joi.exist(),
      // watchedAt: joi.date().iso(),
      // rate: joi.number().integer().min(1).max(5),
    });

  const test = (request, response, next) => {
  const name = joi.string().min(3).required();
  name.validate(request.body.name);
   if (!name) { return response.status(401).json({ message: 'erro' }); }

  // const joierror = schemas.validate({ name: request.body.name }, response.status(401).json({ message: 'fudeu' }));
  // if (!joierror) { return response.status(201).json({ message: 'ok' }); }
  // if (joierror) { return response.status(401).json({ message: 'fudeu!' }); }

  next();
};

module.exports = {
  test,
  schemas,
};