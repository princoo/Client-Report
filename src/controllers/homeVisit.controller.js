import uploadToCloudinary from '../helpers/uploadImage.helper';
import homeVisitService from '../services/homeVisit.service';

const addHomevisit = async (req, res) => {
  const { date, clientName, description } = req.body;
  const imageToUpload = req.files;

  let url = [];
  if (imageToUpload.length > 4 || imageToUpload.length < 1) {
    return res
      .status(400)
      .json({ message: 'Minimun of 1 and Maximum of 4 images allowed.' });
  }
  const uploadedImages = imageToUpload.map(async (item) => {
    const { image } = await uploadToCloudinary(item.path);
    return image;
  });
  // upload images to cloudinary
  url = await Promise.all(uploadedImages);

  const body = {
    date,
    clientName,
    description,
    UserId: req.user.id,
  };
  // add supportgroup in DB
  const data = await homeVisitService.addHomeVisit(body);
  const imageToSend = url.map(async (item) => {
    const imageBody = {
      url: item.url,
      HomeVisitId: data.id,
    };
    const result = await homeVisitService.addImage(imageBody);
    return result;
  });
  // add images in DB
  const addedImages = await Promise.all(imageToSend);
  res
    .status(200)
    .json({ code: 200, message: 'HomeVisit addded', data, addedImages });
};

const addImage = async (req, res) => {
  const { hid } = req.params;
  const imagesToAdd = req.files;
  let url = [];
  if (imagesToAdd) {
    const existingImages = req.homeVisitImages; // existing supportGroup images
    if (imagesToAdd.length + existingImages.length > 4) {
      return res
        .status(400)
        .json({ code: 400, message: 'Maximum of 4 images allowed.' });
    }

    const uploadedImages = imagesToAdd.map(async (item) => {
      const { image } = await uploadToCloudinary(item.path);
      return image;
    });

    url = await Promise.all(uploadedImages); // upload new images to cloudinary

    const imageToSend = url.map(async (item) => {
      const imageBody = {
        url: item.url,
        HomeVisitId: hid,
      };
      const result = await homeVisitService.addImage(imageBody);
      return result;
    });
    const addedImages = await Promise.all(imageToSend); // add new images in DB

    return res.status(200).json({
      code: 200,
      message: 'images added to HomeVisit',
      addedImages,
    });
  }
  return res.status(400).json({ code: 400, message: 'No new image selected' });
};

const removeImage = async (req, res) => {
  const { imagesToRemove } = req;
  const SGroupImages = req.homeVisitImages; // existing homevisit images
  if (SGroupImages.length - imagesToRemove.length <= 0) {
    return res
      .status(400)
      .json({ code: 400, message: 'Maximum of 4 images allowed.' });
  }
  const imageDeletion = imagesToRemove.map(async (item) => {
    const data = await homeVisitService.removeImage(item);
    return data;
  });
  const removedImages = await Promise.all(imageDeletion); // deleting images
  return res
    .status(200)
    .json({ code: 200, message: 'Image(s) deleted', removedImages });
};

const deleteHomeVisit = async (req, res) => {
  const { hid } = req.params;
  const data = await homeVisitService.deleteHomeVisit(hid);
  return res
    .status(200)
    .json({ code: 200, message: 'HomeVisit deleted', data });
};
const allHomevisits = async (req, res) => {
  const { page = 1, pageSize = 10, sortOrder } = req.query;
  const paginationOptions = {
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
    sortOrder: sortOrder === 'asc' ? 'ASC' : 'DESC',
  };
  const data = await homeVisitService.getHomeVisitByUser(
    req.user,
    paginationOptions,
  );

  return res
    .status(200)
    .json({ code: 200, message: 'HomeVisit retrieved', data });
};

export default {
  addHomevisit,
  addImage,
  removeImage,
  deleteHomeVisit,
  allHomevisits,
};
