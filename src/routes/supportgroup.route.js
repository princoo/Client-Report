import express from 'express';
import validate from '../middleware/validation/validation.middleware';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import {
  isAuthenticated,
  checkPermission,
} from '../middleware/auth/authentication';
import supportGroupController from '../controllers/supportGroup.controller';
import supportGroupMiddleware from '../middleware/supportGroup.middleware';
import supportGroupSchema from '../utils/validationSchemas/supportGroupSchema';
import Upload from '../helpers/multer.helper';
import userTypeUtil from '../utils/userType.util';
import checkImageMiddleware from '../middleware/checkImage.middleware';

const supportGroupRouter = express.Router();

// support groups
supportGroupRouter.get(
  '/',
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(supportGroupController.allSupportGroups),
);
supportGroupRouter.post(
  '/add',
  Upload,
  validate(supportGroupSchema.supportGroup),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(supportGroupController.addSupportGroup),
);
supportGroupRouter.delete(
  '/:sid',
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(supportGroupMiddleware.supportGroupExists),
  asyncWrapperHelper(supportGroupController.deleteSupportGroup),
);
supportGroupRouter.post(
  '/images/:sid',
  Upload,
  validate(supportGroupSchema.supportGroupImage),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(supportGroupMiddleware.supportGroupExists),
  asyncWrapperHelper(supportGroupController.addImage),
);
supportGroupRouter.delete(
  '/images/:sid',
  validate(supportGroupSchema.imageToDelete),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(supportGroupMiddleware.supportGroupExists),
  asyncWrapperHelper(checkImageMiddleware.imageExists),
  asyncWrapperHelper(supportGroupController.removeImage),
);

export default supportGroupRouter;
