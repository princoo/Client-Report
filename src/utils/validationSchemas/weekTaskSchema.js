import Joi from 'joi';
import errorMessage from '../errorMessage.util';

const addTaskSchema = Joi.object().keys({
  description: Joi.string()
    .min(3)
    .required()
    .messages(errorMessage('Task description')),
});

export default { addTaskSchema };
