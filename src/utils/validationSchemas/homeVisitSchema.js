import Joi from 'joi';
import errorMessage from '../errorMessage.util';

const homeVisit = Joi.object().keys({
  date: Joi.date().required().messages(errorMessage('Date')),
  clientName: Joi.string()
    .min(3)
    .required()
    .messages(errorMessage('clientName')),
  phone: Joi.number().required().messages(errorMessage('phoneNumber')),
  description: Joi.string()
    .min(3)
    .required()
    .messages(errorMessage('Description')),
  images: Joi.binary().min(1).messages(errorMessage('image')),
});

const homeVisitImage = Joi.object().keys({
  images: Joi.binary().min(1).messages(errorMessage('image')),
});
const imageToDelete = Joi.object().keys({
  imageId: Joi.string().required().messages(errorMessage('image id')),
});

export default { homeVisit, homeVisitImage, imageToDelete };
