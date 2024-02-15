import User from '../database/models/user.model';

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}

async function createUser(details) {
  const user = await User.create(details);
  return user;
}

export default {
  getUserByEmail,
  createUser,
};
