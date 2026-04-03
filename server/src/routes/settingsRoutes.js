import { Router } from 'express';
import { getSettings, updateSettings } from '../services/settingsService.js';

export const settingsRouter = Router();

settingsRouter.get('/', async (_request, response, next) => {
  try {
    response.json(await getSettings());
  } catch (error) {
    next(error);
  }
});

settingsRouter.put('/', async (request, response, next) => {
  try {
    response.json(await updateSettings(request.body));
  } catch (error) {
    next(error);
  }
});
