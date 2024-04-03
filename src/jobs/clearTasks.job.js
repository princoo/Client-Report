import cron from 'node-cron';

import weekTaskService from '../services/weekTask.service';

const clearTasksOnWeekEnd = () => {
  cron.schedule(process.env.CRONE_TASK_SCHEDULE, async () => {
    try {
      await weekTaskService.clearAllTasks();
      console.log('tasks cleared today on', new Date().toLocaleString());
    } catch (error) {
      throw new Error(error);
    }
  });
};

export default clearTasksOnWeekEnd;
