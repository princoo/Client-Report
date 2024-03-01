import express from 'express';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import reportController from '../controllers/report.controller';
import reportSchema from '../utils/validationSchemas/reportSchema';
import { isReportOwner, reportExists } from '../middleware/report.middleware';
import {
  isAuthenticated,
  checkPermission,
} from '../middleware/auth/authentication';
import validate from '../middleware/validation/validation.middleware';
import userTypeUtil from '../utils/userType.util';

const reportRouter = express.Router();

reportRouter.get(
  '/all',
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(reportController.getReports),
);
reportRouter.get(
  '/:rid',
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(reportExists),
  asyncWrapperHelper(isReportOwner),
  asyncWrapperHelper(reportController.getSingleReport),
);
reportRouter.post(
  '/daily',
  validate(reportSchema.dailyReportSchema),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(reportController.DailyReport),
);
reportRouter.patch(
  '/update/:rid',
  validate(reportSchema.updateReportSchema),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(reportExists),
  asyncWrapperHelper(isReportOwner),
  asyncWrapperHelper(reportController.updateReport),
);
reportRouter.delete(
  '/delete/:rid',
  validate(reportSchema.updateReportSchema),
  asyncWrapperHelper(isAuthenticated),
  checkPermission('CATS'),
  asyncWrapperHelper(reportExists),
  asyncWrapperHelper(isReportOwner),
  asyncWrapperHelper(reportController.deleteReport),
);
export default reportRouter;
