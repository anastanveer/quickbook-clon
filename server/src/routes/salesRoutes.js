import { Router } from 'express';
import {
  createSale,
  deleteSale,
  listSales,
  updateSale,
} from '../services/salesService.js';

export const salesRouter = Router();

salesRouter.get('/', async (request, response, next) => {
  try {
    response.json(await listSales(request.query.days));
  } catch (error) {
    next(error);
  }
});

salesRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await createSale(request.body));
  } catch (error) {
    next(error);
  }
});

salesRouter.put('/:id', async (request, response, next) => {
  try {
    await updateSale(request.params.id, request.body);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

salesRouter.delete('/:id', async (request, response, next) => {
  try {
    await deleteSale(request.params.id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});
