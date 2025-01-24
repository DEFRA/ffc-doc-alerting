const Joi = require('joi')
module.exports = Joi.object({
  type: Joi.string().required(),
  source: Joi.string().required(),
  id: Joi.string().uuid().required(),
  time: Joi.date().required(),
  data: Joi.object({
    message: Joi.string().required()
  }).required()
}).required()
