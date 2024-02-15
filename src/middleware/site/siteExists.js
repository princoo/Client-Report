import siteServices from '../../services/site.services';

const siteExists = async (req, res, next) => {
  const site = await siteServices.getSiteByName(req.body.name);
  if (!site) {
    return next();
  }
  return res.status(409).json({ code: 409, message: 'Site Exists.' });
};
const siteNameExists = async (req, res, next) => {
  const site = await siteServices.getSiteByName(req.body.site);
  if (site) {
    req.site = site;
    return next();
  }
  return res.status(409).json({ code: 409, message: 'Site does not exist.' });
};

const isValidSite = async (req, res, next) => {
  const isSite = await siteServices.getSiteById(req.params.id);
  if (!isSite) {
    return res
      .status(404)
      .json({ code: 404, message: 'Site Does not Exists.' });
  }
  return next();
};
export { siteExists, isValidSite, siteNameExists };
