import homeVisitService from '../services/homeVisit.service';

const homeVisitExists = async (req, res, next) => {
  const { hid } = req.params;
  const data = await homeVisitService.getHomeVisitById(hid);
  if (data != null) {
    if (data.UserId === req.user.id) {
      req.homeVisit = data;
      req.homeVisitImages = await data.getHVisitImages(); // get all homevisit images
      return next();
    }
    return res.status(404).json({
      code: 404,
      message: `UnAuthorized on homevisit with id: ${sid}`,
    });
  }
  return res
    .status(404)
    .json({ code: 404, message: `homeVisit with id: ${sid} not found` });
};

export default { homeVisitExists };
