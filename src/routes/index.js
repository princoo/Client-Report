import express from 'express';
import userController from '../controllers/user.controller';
import '../middleware/passport.middleware';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import validate from '../middleware/validation/validation.middleware';
import checkImageMiddleware from '../middleware/checkImage.middleware';
import userExists from '../middleware/auth/userExists';
import reportController from '../controllers/report.controller';
import checkPermission, {
  isAuthenticated,
} from '../middleware/auth/authentication';
import {
  siteSchema,
  reportSchema,
  SignUpSchema,
  loginSchema,
  roleSchema,
  supportGroupSchema,
} from '../utils/validationSchemas/schemas';
import { addSite, allSites, removeSite } from '../controllers/site.controller';
import {
  isValidSite,
  siteExists,
  siteNameExists,
} from '../middleware/site/siteExists';
import { isReportOwner, reportExists } from '../middleware/report.middleware';
import supportGroupMiddleware from '../middleware/supportGroup.middleware';
import userTypeUtil from '../utils/userType.util';
import Upload from '../helpers/multer.helper';
import supportGroupController from '../controllers/supportGroup.controller';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('You are live');
});

router.post(
  '/signup',
  validate(SignUpSchema),
  asyncWrapperHelper(userExists.userEmailExists),
  asyncWrapperHelper(siteNameExists),
  asyncWrapperHelper(userController.signup),
);
router.post(
  '/login',
  validate(loginSchema),
  asyncWrapperHelper(userController.login),
);

router.get('/sites', asyncWrapperHelper(allSites));
router.post(
  '/site/add',
  validate(siteSchema.site),
  siteExists,
  asyncWrapperHelper(addSite),
);
router.delete(
  '/site/remove/:id',
  asyncWrapperHelper(isValidSite),
  asyncWrapperHelper(removeSite),
);
router.get(
  '/report/all',
  isAuthenticated,
  asyncWrapperHelper(reportController.getReports),
);
router.get(
  '/report/:rid',
  isAuthenticated,
  asyncWrapperHelper(reportExists),
  asyncWrapperHelper(isReportOwner),
  asyncWrapperHelper(reportController.getSingleReport),
);
router.post(
  '/report/daily',
  validate(reportSchema.dailyReportSchema),
  asyncWrapperHelper(isAuthenticated),
  checkPermission('CATS'),
  asyncWrapperHelper(reportController.DailyReport),
);
router.patch(
  '/report/update/:rid',
  validate(reportSchema.updateReportSchema),
  asyncWrapperHelper(isAuthenticated),
  checkPermission('CATS'),
  asyncWrapperHelper(reportExists),
  asyncWrapperHelper(isReportOwner),
  asyncWrapperHelper(reportController.updateReport),
);
router.delete(
  '/report/delete/:rid',
  validate(reportSchema.updateReportSchema),
  asyncWrapperHelper(isAuthenticated),
  checkPermission('CATS'),
  asyncWrapperHelper(reportExists),
  asyncWrapperHelper(isReportOwner),
  asyncWrapperHelper(reportController.deleteReport),
);
router.patch(
  '/role/change/:uid',
  validate(roleSchema),
  asyncWrapperHelper(isAuthenticated),
  checkPermission('CATS_MENTOR'),
  asyncWrapperHelper(userExists.isValidUser),
  // below checks if you are trying to update other CATS_MENTOR's Role
  asyncWrapperHelper(userExists.isSelfAction),
  asyncWrapperHelper(userController.roleChange),
);

// support groups
router.get(
  '/supportgroup/',
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(supportGroupController.allSupportGroups),
);
router.post(
  '/supportgroup/add',
  Upload,
  validate(supportGroupSchema.supportGroup),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(supportGroupController.addSupportGroup),
);
router.delete(
  '/supportgroup/:sid',
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(supportGroupMiddleware.supportGroupExists),
  asyncWrapperHelper(supportGroupController.deleteSupportGroup),
);
router.post(
  '/supportgroup/images/:sid',
  Upload,
  validate(supportGroupSchema.supportGroupImage),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(supportGroupMiddleware.supportGroupExists),
  asyncWrapperHelper(supportGroupController.addImage),
);
router.delete(
  '/supportgroup/images/:sid',
  validate(supportGroupSchema.imageToDelete),
  asyncWrapperHelper(isAuthenticated),
  checkPermission(userTypeUtil.CATS),
  asyncWrapperHelper(supportGroupMiddleware.supportGroupExists),
  asyncWrapperHelper(checkImageMiddleware.imageExists),
  asyncWrapperHelper(supportGroupController.removeImage),
);

export default router;
