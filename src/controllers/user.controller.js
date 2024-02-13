import passport from 'passport';

const signup = async (req, res, next) => {
  try {
    passport.authenticate('signup', { session: false }, (err, user) => {
      if (err) {
        return next(err);
      }
      req.login(user, async () => {
        console.log(user);
      });
    })(req, res, next);
  } catch (error) {
    next(error);
  }
};

export default {
  signup,
};
