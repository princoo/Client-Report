import express from 'express';
import userController from '../controllers/user.controller';
import '../middleware/passport.middleware';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import validate from '../middleware/validation/validation.middleware';
import userEmailExists from '../middleware/auth/userExists';
import { DailyReport } from '../controllers/report.controller';
import {
  siteSchema,
  reportSchema,
  SignUpSchema,
  loginSchema,
} from '../utils/validationSchemas/schemas';
import { addSite, removeSite } from '../controllers/site.controller';
import {
  isValidSite,
  siteExists,
  siteNameExists,
} from '../middleware/site/siteExists';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('You are live');
});

router.post(
  '/signup',
  validate(SignUpSchema),
  asyncWrapperHelper(userEmailExists),
  asyncWrapperHelper(siteNameExists),
  asyncWrapperHelper(userController.signup),
);
router.post(
  '/login',
  validate(loginSchema),
  asyncWrapperHelper(userController.login),
);

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
router.post(
  '/report/daily',
  validate(reportSchema.dailyReportSchema),
  asyncWrapperHelper(DailyReport),
);

export default router;
