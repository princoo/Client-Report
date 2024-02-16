import reportService from '../services/report.service';

const reportExists = async (req, res, next) => {
  const { rid } = req.params;
  const data = await reportService.getReportById(rid);
  if (data) {
    return next();
  }
  res.status(404).json({ code: 404, message: 'Report not found' });
};

const isReportOwner = async (req, res, next) => {
  const { rid } = req.params;
  const data = await reportService.getReportById(rid);
  if (req.user.id === data.UserId) {
    return next();
  }
  res.status(401).json({ code: 401, message: 'UnAuthorized on this report' });
};

export { reportExists, isReportOwner };
