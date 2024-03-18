import express from 'express';
import weekTaskController from '../controllers/weekTask.controller';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import { isAuthenticated } from '../middleware/auth/authentication';
import weeklyPlanMiddleware from '../middleware/weeklyPlan.middleware';
import validate from '../middleware/validation/validation.middleware';
import weekTaskSchema from '../utils/validationSchemas/weekTaskSchema';
import weekTaskMiddleware from '../middleware/weekTask.middleware';

const taskRouter = express.Router();

taskRouter.post(
  '/add',
  validate(weekTaskSchema.addTaskSchema),
  asyncWrapperHelper(weekTaskMiddleware.futureDateMiddleware),
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(weeklyPlanMiddleware.weeklyPlanAvailable),
  asyncWrapperHelper(weekTaskController.addWeekTask),
);
taskRouter.get(
  '/all',
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(weeklyPlanMiddleware.weeklyPlanAvailable),
  asyncWrapperHelper(weekTaskController.getWeekTask),
);
taskRouter.delete(
  '/:tid',
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(weeklyPlanMiddleware.weeklyPlanAvailable),
  asyncWrapperHelper(weekTaskMiddleware.weekTaskExists),
  asyncWrapperHelper(weekTaskController.deleteWeekTask),
);
taskRouter.patch(
  '/:tid',
  validate(weekTaskSchema.addTaskSchema),
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(weeklyPlanMiddleware.weeklyPlanAvailable),
  asyncWrapperHelper(weekTaskMiddleware.weekTaskExists),
  asyncWrapperHelper(weekTaskController.updateWeekTask),
);
taskRouter.patch(
  '/status/:tid',
  asyncWrapperHelper(isAuthenticated),
  asyncWrapperHelper(weeklyPlanMiddleware.weeklyPlanAvailable),
  asyncWrapperHelper(weekTaskMiddleware.weekTaskExists),
  asyncWrapperHelper(weekTaskController.updateStatus),
);

export default taskRouter;
