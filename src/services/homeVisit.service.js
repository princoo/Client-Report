import { extractPublicId } from 'cloudinary-build-url';
import Cloudinary from '../helpers/cloudinary.helper';
import paginate from '../helpers/paginator.helper';
import userTypeUtil from '../utils/userType.util';
import HVisitImages from '../database/models/hvisitimages.model';
import HomeVisits from '../database/models/homevisit.model';
import User from '../database/models/user.model';

async function uploadToCloudinary(path) {
  const image = await Cloudinary.uploader.upload(path);
  return { image };
}
async function addImage(body) {
  const result = await HVisitImages.create(body);
  return result;
}
async function removeImage(id) {
  const image = await HVisitImages.findOne({ where: { id } });
  const publice = extractPublicId(image.url);
  const result = await HVisitImages.destroy({ where: { id } });
  await Cloudinary.uploader.destroy(publice);
  return result;
}
async function addHomeVisit(body) {
  const result = await HomeVisits.create(body);
  return result;
}
async function deleteHomeVisit(id) {
  const result = await HomeVisits.destroy({ where: { id } });
  return result;
}
async function getHomeVisitById(id) {
  const result = await HomeVisits.findOne({
    where: { id },
  });
  return result;
}
async function getHomeVisitByUser(user, paginationObject) {
  let result;
  if (user.role === userTypeUtil.CATS) {
    result = await HomeVisits.findAll({
      where: { UserId: user.id },
      ...paginate(paginationObject),
      include: [
        {
          model: HVisitImages,
          as: 'HVisitImages',
        },
        {
          model: User,
          as: 'User',
          attributes: ['firstName', 'lastName', 'email', 'phone'],
        },
      ],
    });
  } else {
    result = await HomeVisits.findAll({
      ...paginate(paginationObject),
      include: [
        {
          model: HVisitImages,
          as: 'HVisitImages',
        },
        {
          model: User,
          as: 'User',
          attributes: ['firstName', 'lastName', 'email', 'phone'],
        },
      ],
    });
  }
  return result;
}

export default {
  uploadToCloudinary,
  addHomeVisit,
  deleteHomeVisit,
  addImage,
  removeImage,
  getHomeVisitById,
  getHomeVisitByUser,
};
