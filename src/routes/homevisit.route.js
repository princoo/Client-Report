import express from 'express';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import {
  isAuthenticated,
  checkPermission,
} from '../middleware/auth/authentication';
import homeVisitController from '../controllers/homeVisit.controller';
import Upload from '../helpers/multer.helper';
import validate from '../middleware/validation/validation.middleware';
import homeVisitSchema from '../utils/validationSchemas/homeVisitSchema';
import homeVisitMiddleware from '../middleware/homeVisit.middleware';
import userTypeUtil from '../utils/userType.util';
import checkImageMiddleware from '../middleware/checkImage.middleware';

const HomevisitRouter = express.Router();

HomevisitRouter.get(
  '/all',
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(homeVisitController.allHomevisits),
);
HomevisitRouter.post(
  '/add',
  Upload,
  validate(homeVisitSchema.homeVisit),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(homeVisitController.addHomevisit),
);
HomevisitRouter.delete(
  '/:hid',
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(homeVisitMiddleware.homeVisitExists),
  asyncWrapperHelper(homeVisitController.deleteHomeVisit),
);
HomevisitRouter.post(
  '/images/:sid',
  Upload,
  validate(homeVisitSchema.homeVisitImage),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(homeVisitMiddleware.homeVisitExists),
  asyncWrapperHelper(homeVisitController.addImage),
);
HomevisitRouter.delete(
  '/images/:hid',
  validate(homeVisitSchema.imageToDelete),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(homeVisitMiddleware.homeVisitExists),
  asyncWrapperHelper(checkImageMiddleware.homeVisitImageExists),
  asyncWrapperHelper(homeVisitController.removeImage),
);
export default HomevisitRouter;
