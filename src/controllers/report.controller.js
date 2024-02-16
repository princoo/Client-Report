import reportService from '../services/report.service';

const DailyReport = async (req, res) => {
  const { clientName, activityDone, discussedIssues } = req.body;
  const body = {
    clientName,
    activityDone,
    discussedIssues,
    UserId: req.user.id,
  };
  const data = await reportService.createReport(body);
  res.status(200).json({ code: 200, message: 'Report created', data });
};

const getReports = async (req, res) => {
  const data = await reportService.getReportsByUser(req.user);
  res.status(200).json({ code: 200, message: 'Reports retrieved', data });
};
const updateReport = async (req, res) => {
  const { rid } = req.params;
  const data = await reportService.updateReport(req.body, rid);
  res.status(200).json({ code: 200, message: 'Report updated', data });
};
const deleteReport = async (req, res) => {
  const { rid } = req.params;
  const data = await reportService.deleteReport(rid);
  res.status(200).json({ code: 200, message: 'Report deleted', data });
};
export default { DailyReport, updateReport, deleteReport, getReports };
