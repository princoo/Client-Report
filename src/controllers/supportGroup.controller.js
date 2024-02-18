import supportGroupService from '../services/supportGroup.service';

const addSupportGroup = async (req, res) => {
  const { date, description } = req.body;
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
  const addedImages = await Promise.all(imageToSend);
  res
    .status(200)
    .json({ code: 200, message: 'supportGroup addded', data, addedImages });
};

export default { addSupportGroup };
