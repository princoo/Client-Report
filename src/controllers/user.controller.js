import passport from 'passport';
import { generateToken } from '../utils/token.util';
import userService from '../services/user.service';

const signup = async (req, res, next) => {
  try {
    passport.authenticate('signup', { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      req.login(user, async () => {
        const body = {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          status: user.status,
        };
        // generate token
        const token = generateToken(body);
        res
          .status(201)
          .header('authenticate', token)
          .json({ code: 201, message: 'Account Created', token });
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    passport.authenticate(
      'login',
      { session: false },

      async (err, user, info) => {
        if (err || !user) {
          return next(err || info);
        }

        const body = {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          status: user.status,
        };
        if (user.status === 'INACTIVE') {
          return res
            .status(401)
            .json({ code: 401, message: 'Your account has been diactivated.' });
        }
        const token = generateToken(body);
        req.user = user;
        return res
          .status(200)
          .header('Authorization', token)
          .json({
            Code: 200,
            message: `Logged In Successfully as ${req.user.firstName} .`,
            token,
          });
      },
    )(req, res, next);
  } catch (error) {
    return next(error);
  }
};

const roleChange = async (req, res) => {
  const { uid } = req.params;
  const { role } = req.body;
  const data = await userService.changeUserRole(role, uid);
  res.status(200).json({ code: 200, message: ' User role Changed', data });
};

export default {
  signup,
  login,
  roleChange,
};
