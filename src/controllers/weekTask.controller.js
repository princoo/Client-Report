import weekTaskService from '../services/weekTask.service';

const addWeekTask = async (req, res) => {
  const { description } = req.body;
  const { id } = req.weeklyPlan;
  const body = {
    description,
    weeklyPlanId: id,
  };
  const data = await weekTaskService.createTask(body);
  res.status(200).json({ code: 200, message: 'Task created', data });
};
const getWeekTask = async (req, res) => {
  const { id } = req.weeklyPlan;
  const data = await weekTaskService.getTasksByPlanId(id);
  res.status(200).json({ code: 200, message: 'Tasks Retrieved', data });
};
const deleteWeekTask = async (req, res) => {
  const { tid } = req.params;
  const data = await weekTaskService.deleteTask(tid);
  res.status(200).json({ code: 200, message: 'Tasks Deleted', data });
};

const updateWeekTask = async (req, res) => {
  const { description } = req.body;
  const { tid } = req.params;
  const body = {
    description,
  };
  const data = await weekTaskService.updateTask(body, tid);
  res.status(200).json({ code: 200, message: 'Task Updated', data });
};
const updateStatus = async (req, res) => {
  const { tid } = req.params;
  const { status } = req.task;
  let updatedStatus;
  if (status === 'PENDING') {
    updatedStatus = 'COMPLETED';
  } else {
    updatedStatus = 'PENDING';
  }
  const body = {
    status: updatedStatus,
  };
  const data = await weekTaskService.updateTask(body, tid);
  res.status(200).json({ code: 200, message: 'Task status Updated', data });
};

export default {
  addWeekTask,
  getWeekTask,
  deleteWeekTask,
  updateWeekTask,
  updateStatus,
};
