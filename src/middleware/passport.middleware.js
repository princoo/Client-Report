import passport from 'passport';
import LocalStrategy from 'passport-local';
import { comparePassword, hashPassword } from '../utils/password.util';
import userServices from '../services/user.service';
import weeklyPlanService from '../services/weeklyPlan.service';

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const data = {
          email: email.trim(),
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          SiteId: req.site.id,
          password: await hashPassword(password),
        };
        const user = await userServices.createUser(data);
        await weeklyPlanService.createWeeklyPlay(user.dataValues.id); // create weeklyPlan for the new User
        done(null, user.dataValues);
      } catch (error) {
        done(error);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      try {
        const user = await userServices.getUserByEmail(email);
        if (user) {
          const passCheck = await comparePassword(password, user.password);
          if (passCheck) {
            return done(null, user.dataValues, {
              message: 'Logged In Successfully',
            });
          }
          return done(null, false, { message: 'Password is incorrect' });
        }
        return done(null, false, { message: 'User not Found.' });
      } catch (error) {
        done(error);
      }
    },
  ),
);

export default passport;
