import createWeeklyPlay from '../services/weeklyPlan.service';

const addWeeklyPlan = async (req, res) => {
  const { UserId } = req.body;
  const data = await createWeeklyPlay(UserId);
  res.status(200).json({ code: 200, message: 'WeeklyPlan created', data });
};

export default { addWeeklyPlan };
