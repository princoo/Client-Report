import express from 'express';
import asyncWrapperHelper from '../helpers/asyncWrapper.helper';
import { removeSite, addSite, allSites } from '../controllers/site.controller';
import { isValidSite, siteExists } from '../middleware/site/siteExists';
import siteSchema from '../utils/validationSchemas/siteSchema';
import validate from '../middleware/validation/validation.middleware';

const siteRouter = express.Router();

siteRouter.get('/', asyncWrapperHelper(allSites));
siteRouter.post(
  '/add',
  validate(siteSchema.site),
  asyncWrapperHelper(siteExists),
  asyncWrapperHelper(addSite),
);
siteRouter.delete(
  '/remove/:id',
  asyncWrapperHelper(isValidSite),
  asyncWrapperHelper(removeSite),
);

export default siteRouter;
