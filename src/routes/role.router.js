import express from 'express';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import { roleSchema } from '../utils/validationSchemas/authShema';
import validate from '../middleware/validation/validation.middleware';
import userTypeUtil from '../utils/userType.util';
import userExists from '../middleware/auth/userExists';
import userController from '../controllers/user.controller';
import {
  isAuthenticated,
  checkPermission,
} from '../middleware/auth/authentication';

const roleRouter = express.Router();

roleRouter.patch(
  '/change/:uid',
  validate(roleSchema),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS_MENTOR),
  asyncWrapperHelper(userExists.isValidUser),
  // below checks if you are trying to update other CATS_MENTOR's Role
  asyncWrapperHelper(userExists.isSelfAction),
  asyncWrapperHelper(userController.roleChange),
);

export default roleRouter;
