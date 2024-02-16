import Sites from '../database/models/sites.model';

async function createSite(body) {
  const data = await Sites.create(body);
  return { data };
}
async function deleteSite(id) {
  // const ReturnedId = await getSiteById(id)
  const result = await Sites.destroy({ where: { id } });
  return { result };
}
async function getSiteByName(name) {
  const site = await Sites.findOne({ where: { name } });
  return site;
}
async function getSiteById(id) {
  const site = await Sites.findOne({ where: { id } });
  return site;
}

export default {
  createSite,
  getSiteByName,
  deleteSite,
  getSiteById,
};
