import { Op } from 'sequelize';
import moment from 'moment';
import DailyReport from '../database/models/dailyreport.model';
import userTypeUtil from '../utils/userType.util';

const createReport = async (body) => {
  const result = await DailyReport.create(body);
  return result;
};
const getReportsByUser = async (user) => {
  let result;
  if (user.role === userTypeUtil.CATS) {
    result = await DailyReport.findAll({ where: { UserId: user.id } });
  } else {
    result = await DailyReport.findAll();
  }
  return result;
};
const getUserTodayReports = async (user) => {
  let result;
  const formattedDate = moment().format('YYYY-MM-DD');
  if (user.role === userTypeUtil.CATS) {
    result = await DailyReport.findAll({
      where: {
        UserId: user.id,
        createdAt: {
          [Op.between]: [
            `${formattedDate} 00:00:00`,
            `${formattedDate} 23:59:59`,
          ],
        },
      },
    });
  } else {
    result = await DailyReport.findAll({
      where: {
        createdAt: {
          [Op.between]: [
            `${formattedDate} 00:00:00`,
            `${formattedDate} 23:59:59`,
          ],
        },
      },
    });
  }
  return result;
};
const getReportById = async (id) => {
  const result = await DailyReport.findOne({ where: { id } });
  return result;
};

const updateReport = async (body, id) => {
  const result = await DailyReport.update(body, {
    where: { id },
    returning: true,
  });
  return result;
};
const deleteReport = async (id) => {
  const result = await DailyReport.destroy({ where: { id } });
  return result;
};

export default {
  createReport,
  getReportById,
  updateReport,
  deleteReport,
  getReportsByUser,
  getUserTodayReports,
};
