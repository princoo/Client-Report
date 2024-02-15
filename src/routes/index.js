import express from 'express';
import userController from '../controllers/user.controller';
import '../middleware/passport.middleware';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import validate from '../middleware/validation/validation.middleware';
import {
  SignUpSchema,
  loginSchema,
} from '../utils/validationSchemas/authShema';
import userEmailExists from '../middleware/auth/userExists';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('You are live');
});

router.post(
  '/signup',
  validate(SignUpSchema),
  userEmailExists,
  asyncWrapperHelper(userController.signup),
);
router.post(
  '/login',
  validate(loginSchema),
  asyncWrapperHelper(userController.login),
);

export default router;
