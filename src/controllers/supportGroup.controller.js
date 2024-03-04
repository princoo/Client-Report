import supportGroupService from '../services/supportGroup.service';

const addSupportGroup = async (req, res) => {
  const { date, description, title } = req.body;
  const imageToUpload = req.files;

  let url = [];
  if (imageToUpload.length > 4 || imageToUpload.length < 1) {
    return res
      .status(400)
      .json({ message: 'Minimun of 1 and Maximum of 4 images allowed.' });
  }
  const uploadedImages = imageToUpload.map(async (item) => {
    const { image } = await supportGroupService.uploadToCloudinary(item.path);
    return image;
  });
  // upload images to cloudinary
  url = await Promise.all(uploadedImages);

  const body = {
    date,
    description,
    title,
    UserId: req.user.id,
  };
  // add supportgroup in DB
  const data = await supportGroupService.addSupportGroup(body);
  const imageToSend = url.map(async (item) => {
    const imageBody = {
      url: item.url,
      SupportGroupId: data.id,
    };
    const result = await supportGroupService.addImage(imageBody);
    return result;
  });
  // add images in DB
  const SGroupImages = await Promise.all(imageToSend);
  res
    .status(200)
    .json({ code: 200, message: 'supportGroup addded', data, SGroupImages });
};

const addImage = async (req, res) => {
  const { sid } = req.params;
  const imagesToAdd = req.files;
  let url = [];
  if (imagesToAdd) {
    const existingImages = req.supportGroupImages; // existing supportGroup images
    if (imagesToAdd.length + existingImages.length > 2) {
      return res.status(400).json({
        code: 400,
        message: 'cant exceed. Maximum of 2 images allowed.',
      });
    }

    const uploadedImages = imagesToAdd.map(async (item) => {
      const { image } = await supportGroupService.uploadToCloudinary(item.path);
      return image;
    });

    url = await Promise.all(uploadedImages); // upload new images to cloudinary

    const imageToSend = url.map(async (item) => {
      const imageBody = {
        url: item.url,
        SupportGroupId: sid,
      };
      const result = await supportGroupService.addImage(imageBody);
      return result;
    });
    const addedImages = await Promise.all(imageToSend); // add new images in DB

    return res.status(200).json({
      code: 200,
      message: 'images added to supportGroup',
      SGroupImages: addedImages,
    });
  }
  return res.status(400).json({ code: 400, message: 'No new image selected' });
};

const removeImage = async (req, res) => {
  const { imagesToRemove } = req;
  const SGroupImages = req.supportGroupImages; // existing supportGroup images
  if (SGroupImages.length - imagesToRemove.length <= 0) {
    return res.status(400).json({
      code: 400,
      message: ' Cant Delete. Minimum of 1 image required.',
    });
  }
  const imageDeletion = imagesToRemove.map(async (item) => {
    const data = await supportGroupService.removeImage(item);
    return data;
  });
  const removedImages = await Promise.all(imageDeletion); // deleting images
  return res
    .status(200)
    .json({ code: 200, message: 'Image(s) deleted', removedImages });
};

const deleteSupportGroup = async (req, res) => {
  const { sid } = req.params;
  const response = await supportGroupService.deleteSupportGroup(sid);
  const data = {
    deletedId: sid,
    response,
  };
  return res
    .status(200)
    .json({ code: 200, message: 'Support group deleted', data });
};
const allSupportGroups = async (req, res) => {
  const { page = 1, pageSize = 10, sortOrder } = req.query;
  const paginationOptions = {
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
    sortOrder: sortOrder === 'asc' ? 'ASC' : 'DESC',
  };
  const data = await supportGroupService.getSupportGroupByUser(
    req.user,
    paginationOptions,
  );

  return res
    .status(200)
    .json({ code: 200, message: 'support groups retrieved', data });
};

const getSingleSupportgroup = async (req, res) => {
  const data = {
    body: req.supportGroupAction,
    images: req.supportGroupImages,
  };
  return res
    .status(200)
    .json({ code: 200, message: 'support group retrieved', data });
};

const updateSupportGroup = async (req, res) => {
  const { sid } = req.params;
  const data = await supportGroupService.updateSupportGroup(req.body, sid);
  res.status(200).json({ code: 200, message: 'SupportGroup updated', data });
};

export default {
  addSupportGroup,
  addImage,
  removeImage,
  deleteSupportGroup,
  allSupportGroups,
  getSingleSupportgroup,
  updateSupportGroup,
};
