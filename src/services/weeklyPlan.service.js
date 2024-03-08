import WeeklyPlan from '../database/models/weeklyplan';

async function createWeeklyPlay(UserId) {
  const result = await WeeklyPlan.create({ UserId });
  return result;
}

async function getUserWeeklyPlan(UserId) {
  const result = await WeeklyPlan.findOne({ where: { UserId } });
  return result;
}

export default { createWeeklyPlay, getUserWeeklyPlan };
