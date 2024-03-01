import express from 'express';
import '../middleware/passport.middleware';
import userController from '../controllers/user.controller';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import validate from '../middleware/validation/validation.middleware';
import userExists from '../middleware/auth/userExists';
import { SignUpSchema, loginSchema } from '../utils/validationSchemas/schemas';
import { siteNameExists } from '../middleware/site/siteExists';
import HomevisitRouter from './homevisit.route';
import supportGroupRouter from './supportgroup.route';
import roleRouter from './role.router';
import reportRouter from './report.router';
import siteRouter from './site.router';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('You are live on Cats Care');
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

router.use('/site', siteRouter);
router.use('/role', roleRouter);
router.use('/report', reportRouter);
router.use('/supportgroup', supportGroupRouter);
router.use('/homevisit', HomevisitRouter);

router.use('*', (req, res) => {
  res.status(404).json({
    code: 404,
    message: 'Route Not Found',
  });
});

export default router;
