import Joi from 'joi';
import errorMessage from '../errorMessage.util';

const supportGroup = Joi.object().keys({
  date: Joi.date().required().messages(errorMessage('Date')),
  description: Joi.string()
    .min(3)
    .required()
    .messages(errorMessage('Description')),
  images: Joi.binary().min(1).messages(errorMessage('image')),
  title: Joi.string().min(3).required().messages(errorMessage('Title')),
});

const supportGroupImage = Joi.object().keys({
  images: Joi.binary().min(1).messages(errorMessage('image')),
});
const imageToDelete = Joi.object().keys({
  imageId: Joi.string().required().messages(errorMessage('image id')),
});

export default { supportGroup, supportGroupImage, imageToDelete };
