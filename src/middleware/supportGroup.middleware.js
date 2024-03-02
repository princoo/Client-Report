import supportGroupService from '../services/supportGroup.service';

const supportGroupExists = async (req, res, next) => {
  const { sid } = req.params;
  const data = await supportGroupService.getSupportGroupById(sid);
  if (data != null) {
    if (data.UserId === req.user.id) {
      req.supportGroupAction = data;
      req.supportGroupImages = await data.getSGroupImages(); // get all supportgroup images
      return next();
    }
    return res.status(404).json({
      code: 404,
      message: `UnAuthorized on supportGroup with id: ${sid}`,
    });
  }
  return res
    .status(404)
    .json({ code: 404, message: `Support group with id: ${sid} not found` });
};

export default { supportGroupExists };
