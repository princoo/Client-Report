const imageExists = (req, res, next) => {
  const { imageId } = req.body;
  const SGroupImages = req.supportGroupImages; // existing images of supportgroup
  const imageIds = SGroupImages.map((item) => item.id); // existing image IDs
  let imagesArray = [];

  if (Array.isArray(imageId)) {
    imagesArray = imageId;
  } else {
    imagesArray.push(imageId);
  }
  const allImagesExists = imagesArray.every((element) =>
    imageIds.includes(element),
  );

  if (allImagesExists) {
    // check if the ids are not of existing images
    req.imagesToRemove = imagesArray;
    return next();
  }
  return res.status(404).json({ code: 404, message: 'check your image IDs' });
};
const homeVisitImageExists = (req, res, next) => {
  const { imageId } = req.body;
  const HVisitImages = req.homeVisitImages; // existing images of supportgroup
  const imageIds = HVisitImages.map((item) => item.id); // existing image IDs
  let imagesArray = [];

  if (Array.isArray(imageId)) {
    imagesArray = imageId;
  } else {
    imagesArray.push(imageId);
  }
  const allImagesExists = imagesArray.every((element) =>
    imageIds.includes(element),
  );

  if (allImagesExists) {
    // check if the ids are not of existing images
    req.imagesToRemove = imagesArray;
    return next();
  }
  return res.status(404).json({ code: 404, message: 'check your image IDs' });
};

export default { imageExists, homeVisitImageExists };
