import siteServices from '../services/site.services';

const allSites = async (req, res) => {
  const { data } = await siteServices.getAllSites();
  res.status(200).json({ code: 200, message: 'site Added successfully', data });
};
const addSite = async (req, res) => {
  const { name } = req.body;
  const { data } = await siteServices.createSite({ name });
  res.status(200).json({ code: 200, message: 'site Added successfully', data });
};
const removeSite = async (req, res) => {
  const { id } = req.params;
  const { result } = await siteServices.deleteSite(id);
  res.status(200).json({ code: 200, message: 'site removed', result });
};

export { addSite, removeSite, allSites };
