import moment from 'moment';
import weekTaskService from '../services/weekTask.service';

const weekTaskExists = async (req, res, next) => {
  const { tid } = req.params;
  const data = await weekTaskService.getTaskById(tid);
  if (data) {
    if (data.WeeklyPlanId === req.weeklyPlan.id) {
      req.task = data;
      return next();
    }
    res.status(401).json({ code: 401, message: 'Unauthorized on this task' });
  }

  res
    .status(401)
    .json({ code: 404, message: `Task with id ${tid} not found !!` });
};

const isFutureDate = (dateString) => {
  const userDate = moment(dateString);

  // Check if the user-entered date is valid
  if (!userDate.isValid()) {
    throw new Error('Invalid date format. Please enter a valid date.');
  }

  // Check if the user-entered date is in the future
  const now = moment();
  return userDate.isAfter(now);
};

function futureDateMiddleware(req, res, next) {
  const userEnteredDate = req.body.dueDate;
  if (!isFutureDate(userEnteredDate)) {
    return res.status(400).json({
      code: 400,
      message: 'The entered date must be in the future.',
    });
  }
  return next();
}

export default { weekTaskExists, futureDateMiddleware };
