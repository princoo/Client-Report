import userService from '../../services/user.service';

const userEmailExists = async (req, res, next) => {
  const user = await userService.getUserByEmail(req.body.email);
  if (!user) {
    return next();
  }
  return res.status(409).json({ code: 409, message: 'Email Exists.' });
};

export default userEmailExists;
