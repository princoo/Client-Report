import Cloudinary from '../helpers/cloudinary.helper';
import SupportGroups from '../database/models/supportgroup';
import SGroupImages from '../database/models/sgroupimages';

async function uploadToCloudinary(path) {
  console.log('first');
  const image = await Cloudinary.uploader.upload(path);
  console.log('sec');
  return { image };
}
async function addImage(body) {
  const result = await SGroupImages.create(body);
  return result;
}
async function addSupportGroup(body) {
  const result = await SupportGroups.create(body);
  return result;
}

export default { uploadToCloudinary, addSupportGroup, addImage };
