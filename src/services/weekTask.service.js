import moment from 'moment';
import WeekTasks from '../database/models/tasks';

function getEndOfWeek(date) {
  return moment(date).endOf('isoWeek').toDate();
}
const createTask = async (body) => {
  const currentDate = moment();
  const endOfWeek = getEndOfWeek(currentDate);
  const result = await WeekTasks.create({
    description: body.description,
    dueDate: endOfWeek.toISOString(),
    WeeklyPlanId: body.weeklyPlanId,
  });
  return result;
};
const getTasksByPlanId = async (id) => {
  const result = await WeekTasks.findAll({
    where: { WeeklyPlanId: id },
  });
  return result;
};

const getTaskById = async (id) => {
  const result = await WeekTasks.findOne({ where: { id } });
  return result;
};

const updateTask = async (body, id) => {
  const result = await WeekTasks.update(body, {
    where: { id },
    returning: true,
  });
  return result;
};

const deleteTask = async (id) => {
  const result = await WeekTasks.destroy({ where: { id } });
  return result;
};

export default {
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByPlanId,
  getEndOfWeek,
};
