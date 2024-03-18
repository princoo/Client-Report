import weekTaskService from '../services/weekTask.service';

const addWeekTask = async (req, res) => {
  const { description, dueDate } = req.body;
  const { firstName, lastName } = req.user;
  const { id } = req.weeklyPlan;
  const body = {
    description,
    WeeklyPlanId: id,
    dueDate,
  };
  const returnedData = await weekTaskService.createTask(body);
  const task = returnedData;
  const data =
    // Add additional properties to each task object
    {
      ...task.dataValues,
      WeeklyPlan: {
        id,
        User: {
          id: req.user.id,
          firstName,
          lastName,
        },
      },
    };
  res.status(200).json({ code: 200, message: 'Task created', data });
};
const getWeekTask = async (req, res) => {
  const { id } = req.weeklyPlan;
  const data = await weekTaskService.getTaskByUser(req.user, id);
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
  const { firstName, lastName } = req.user;
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

  const tasks = data[1];
  const updatedTasks = tasks.map((task) =>
    // Add additional properties to each task object
    ({
      ...task.dataValues,
      WeeklyPlan: {
        id: req.weeklyPlan.id,
        User: {
          id: req.user.id,
          firstName,
          lastName,
        },
      },
    }),
  );
  data[1] = updatedTasks;
  res.status(200).json({ code: 200, message: 'Task status Updated', data });
};

export default {
  addWeekTask,
  getWeekTask,
  deleteWeekTask,
  updateWeekTask,
  updateStatus,
};
