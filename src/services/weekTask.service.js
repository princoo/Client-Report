import moment from 'moment';
import WeekTasks from '../database/models/tasks';
import User from '../database/models/user.model';
import WeeklyPlan from '../database/models/weeklyplan';
import userTypeUtil from '../utils/userType.util';

function getEndOfWeek(date) {
  return moment(date).endOf('isoWeek').toDate();
}
const createTask = async (body) => {
  const result = await WeekTasks.create(body, {
    include: {
      model: WeeklyPlan,
      as: 'WeeklyPlan',
      attributes: ['id'],
      include: {
        model: User,
        as: 'User',
        attributes: ['id', 'firstName', 'lastName'],
      },
    },
  });
  return result;
};
const getTasksByPlanId = async (id) => {
  const result = await WeekTasks.findAll({
    where: { WeeklyPlanId: id },
    include: {
      model: WeeklyPlan,
      as: 'WeeklyPlan',
      attributes: ['id'],
      include: {
        model: User,
        as: 'User',
        attributes: ['id', 'firstName', 'lastName'],
      },
    },
  });
  return result;
};

const getTaskById = async (id) => {
  const result = await WeekTasks.findOne({ where: { id } });
  return result;
};
const getTaskByUser = async (user, wId) => {
  let result;
  if (user.role === userTypeUtil.CATS) {
    result = await WeekTasks.findAll({
      where: { WeeklyPlanId: wId },
      include: {
        model: WeeklyPlan,
        as: 'WeeklyPlan',
        attributes: ['id'],
        include: {
          model: User,
          as: 'User',
          attributes: ['id', 'firstName', 'lastName'],
        },
      },
    });
  } else {
    result = await WeekTasks.findAll({
      include: {
        model: WeeklyPlan,
        as: 'WeeklyPlan',
        attributes: ['id'],
        include: {
          model: User,
          as: 'User',
          attributes: ['id', 'firstName', 'lastName'],
        },
      },
    });
  }
  return result;
};

const updateTask = async (body, id) => {
  const result = await WeekTasks.update(body, {
    where: { id },
    include: {
      model: WeeklyPlan,
      as: 'WeeklyPlan',
      attributes: ['id'],
      include: {
        model: User,
        as: 'User',
        attributes: ['id', 'firstName', 'lastName'],
      },
    },
    returning: true,
  });
  return result;
};
const clearAllTasks = async () => {
  const result = await WeekTasks.truncate();
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
  getTaskByUser,
  clearAllTasks,
};
