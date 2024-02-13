import express from 'express';
import userController from '../controllers/user.controller';
import '../middleware/passport.middleware';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';

const router = express.Router();

router.get('/', (req, res) => {
  res.json('You are live');
});

router.post('/signup', asyncWrapperHelper(userController.signup));

export default router;
