import Joi from 'joi';
import errorMessage from '../errorMessage.util';

const dailyReportSchema = Joi.object().keys({
  date: Joi.date().messages(errorMessage('Date')),
  clientName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages(errorMessage('Client name')),
  activityDone: Joi.string()
    .min(10)
    .required()
    .messages(errorMessage('Activity done')),
  discussedIssues: Joi.string()
    .min(10)
    .required()
    .messages(errorMessage('Activity done')),
});

export default { dailyReportSchema };
