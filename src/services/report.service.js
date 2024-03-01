import { Op } from 'sequelize';
import moment from 'moment';
import DailyReport from '../database/models/dailyreport.model';
import userTypeUtil from '../utils/userType.util';
import paginate from '../helpers/paginator.helper';

const createReport = async (body) => {
  const result = await DailyReport.create(body);
  return result;
};
const getReportsByUser = async (user) => {
  let result;
  if (user.role === userTypeUtil.CATS) {
    result = await DailyReport.findAll({
      where: { UserId: user.id },
      ...paginate(paginationObject),
    });
  } else {
    result = await DailyReport.findAll({
      ...paginate(paginationObject),
    });
  }
  return result;
};
const getUserTodayReports = async (user, paginationObject) => {
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
      ...paginate(paginationObject),
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
      ...paginate(paginationObject),
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
