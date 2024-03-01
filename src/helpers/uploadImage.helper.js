import Cloudinary from './cloudinary.helper';

async function uploadToCloudinary(path) {
  const image = await Cloudinary.uploader.upload(path);
  return { image };
}

export default uploadToCloudinary;
