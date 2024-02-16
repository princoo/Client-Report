import DailyReport from '../database/models/dailyreport.model';

const createReport = async (body) => {
  const result = await DailyReport.create(body);
  return result;
};
const getReportsByUser = async (user) => {
  let result;
  if (user.role === 'CATS') {
    result = await DailyReport.findAll({ where: { UserId: user.id } });
  } else {
    result = await DailyReport.findAll();
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
};
