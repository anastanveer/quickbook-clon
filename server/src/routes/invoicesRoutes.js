import { Router } from 'express';
import {
  createInvoice,
  deleteInvoice,
  listInvoices,
  updateInvoice,
} from '../services/invoicesService.js';

export const invoicesRouter = Router();

invoicesRouter.get('/', async (request, response, next) => {
  try {
    response.json(await listInvoices(request.query.days));
  } catch (error) {
    next(error);
  }
});

invoicesRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await createInvoice(request.body));
  } catch (error) {
    next(error);
  }
});

invoicesRouter.put('/:id', async (request, response, next) => {
  try {
    await updateInvoice(request.params.id, request.body);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

invoicesRouter.delete('/:id', async (request, response, next) => {
  try {
    await deleteInvoice(request.params.id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});
