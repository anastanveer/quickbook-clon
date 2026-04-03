import { Router } from 'express';
import { getDashboard } from '../services/dashboardService.js';

export const dashboardRouter = Router();

dashboardRouter.get('/', async (request, response, next) => {
  try {
    const payload = await getDashboard(request.query.days);
    response.json(payload);
  } catch (error) {
    next(error);
  }
});
