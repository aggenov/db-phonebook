const Joi = require("joi");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  number: Joi.string().required()
}); 

module.exports = addContactSchema;