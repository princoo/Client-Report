import userService from '../../services/user.service';

const userEmailExists = async (req, res, next) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (!user) {
    return next();
  }
  return res.status(409).json({ code: 409, message: 'Email Exists.' });
};
const isValidUser = async (req, res, next) => {
  const { uid } = req.params;
  const user = await userService.getUserById(uid);
  if (user) {
    req.actionUser = user;
    return next();
  }
  return res.status(401).json({ code: 401, message: 'User not found' });
};

const isSelfAction = (req, res, next) => {
  const { uid } = req.params;
  if (uid === req.user.id || req.actionUser.role === 'CATS') {
    return next();
  }
  return res.status(401).json({ code: 401, message: 'UnAuthorized' });
};

export default { userEmailExists, isValidUser, isSelfAction };
