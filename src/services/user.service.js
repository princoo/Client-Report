import User from '../database/models/user.model';

async function getUserByEmail(email) {
  const user = await User.findOne({ where: { email } });
  return user;
}
async function getUserById(id) {
  const user = await User.findOne({ where: { id } });
  return user;
}

async function createUser(details) {
  const user = await User.create(details);
  return user;
}
async function changeUserRole(role, id) {
  const result = await User.update({ role }, { where: { id } });
  return result;
}

export default {
  getUserByEmail,
  getUserById,
  createUser,
  changeUserRole,
};
