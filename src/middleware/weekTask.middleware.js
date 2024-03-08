import weekTaskService from '../services/weekTask.service';

const weekTaskExists = async (req, res, next) => {
  const { tid } = req.params;
  const data = await weekTaskService.getTaskById(tid);
  if (data) {
    if (data.WeeklyPlanId === req.weeklyPlan.id) {
      return next();
    }
    res.status(401).json({ code: 401, message: 'Unauthorized on this task' });
  }

  res
    .status(401)
    .json({ code: 404, message: `Task with id ${tid} not found !!` });
};

export default { weekTaskExists };
