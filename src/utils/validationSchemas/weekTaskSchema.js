import Joi from 'joi';
import extension from '@joi/date';
import errorMessage from '../errorMessage.util';

const ExtendedJoi = Joi.extend(extension); // Extend Joi with joi-date

const addTaskSchema = ExtendedJoi.object().keys({
  description: ExtendedJoi.string()
    .min(3)
    .required()
    .messages(errorMessage('Task description')),
  dueDate: ExtendedJoi.date()
    .format('YYYY-MM-DD')
    .required()
    .messages(errorMessage('Date')),
});

export default { addTaskSchema };
