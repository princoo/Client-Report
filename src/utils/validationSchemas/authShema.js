import Joi from 'joi';
import errorMessage from '../errorMessage.util';

const fNameSchema = Joi.string()
  .min(3)
  .max(30)
  .required()
  .messages(errorMessage('first name'));

const lNameSchema = Joi.string()
  .min(3)
  .max(30)
  .required()
  .messages(errorMessage('last name'));

const phoneSchema = Joi.number()
  .required()
  .messages(errorMessage('phone number'));

const emailSchema = Joi.string()
  .email()
  .required()
  .messages(errorMessage('Email'));

const siteSchema = Joi.string()
  .required()
  .messages(errorMessage('operation site'));

const passwordSchema = Joi.string()
  .required()
  .pattern(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0123456789])(?=.*[@$!%*?&])[A-Za-z0123456789@$!%*?&]{6,}$/,
  )
  .messages(errorMessage('Password'));

const SignUpSchema = Joi.object().keys({
  firstName: fNameSchema,
  lastName: lNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  site: siteSchema,
  password: passwordSchema,
});
const loginSchema = Joi.object().keys({
  email: emailSchema,
  password: passwordSchema,
});
const roleSchema = Joi.object().keys({
  role: Joi.string()
    .valid('CATS', 'CATS_MENTOR')
    .required()
    .messages(errorMessage('Role')),
});

export { loginSchema, SignUpSchema, roleSchema };
