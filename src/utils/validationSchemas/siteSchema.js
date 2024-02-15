import Joi from 'joi';
import errorMessage from '../errorMessage.util';

const site = Joi.object().keys({
  name: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages(errorMessage('Site name')),
});

export default { site };
