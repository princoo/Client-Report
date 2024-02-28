import { extractPublicId } from 'cloudinary-build-url';
import Cloudinary from '../helpers/cloudinary.helper';
import SupportGroups from '../database/models/supportgroup';
import SGroupImages from '../database/models/sgroupimages';
import paginate from '../helpers/paginator.helper';
import userTypeUtil from '../utils/userType.util';

async function uploadToCloudinary(path) {
  const image = await Cloudinary.uploader.upload(path);
  return { image };
}
async function addImage(body) {
  const result = await SGroupImages.create(body);
  return result;
}
async function removeImage(id) {
  const image = await SGroupImages.findOne({ where: { id } });
  const publice = extractPublicId(image.url);
  const result = await SGroupImages.destroy({ where: { id } });
  await Cloudinary.uploader.destroy(publice);
  return result;
}
async function addSupportGroup(body) {
  const result = await SupportGroups.create(body);
  return result;
}
async function deleteSupportGroup(id) {
  const result = await SupportGroups.destroy({ where: { id } });
  return result;
}
async function getSupportGroupById(id) {
  const result = await SupportGroups.findOne({
    where: { id },
  });
  return result;
}
async function getSupportGroupByUser(user, paginationObject) {
  let result;
  if (user.role === userTypeUtil.CATS) {
    result = await SupportGroups.findAll({
      where: { UserId: user.id },
      ...paginate(paginationObject),
    });
  } else {
    result = await SupportGroups.findAll({
      ...paginate(paginationObject),
    });
  }
  return result;
}

export default {
  uploadToCloudinary,
  addSupportGroup,
  deleteSupportGroup,
  addImage,
  removeImage,
  getSupportGroupById,
  getSupportGroupByUser,
};
