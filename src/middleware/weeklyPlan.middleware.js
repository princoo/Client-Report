import weeklyPlanService from '../services/weeklyPlan.service';

const weeklyPlanAvailable = async (req, res, next) => {
  const data = await weeklyPlanService.getUserWeeklyPlan(req.user.id);
  if (data) {
    req.weeklyPlan = data;
    return next();
  }
  res
    .status(401)
    .json({ code: 401, message: 'No weeklyPlan assigned to you yet' });
};

export default { weeklyPlanAvailable };
