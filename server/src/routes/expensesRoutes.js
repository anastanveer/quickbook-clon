import { Router } from 'express';
import {
  createExpense,
  deleteExpense,
  listExpenses,
  updateExpense,
} from '../services/expensesService.js';

export const expensesRouter = Router();

expensesRouter.get('/', async (request, response, next) => {
  try {
    response.json(await listExpenses(request.query.days));
  } catch (error) {
    next(error);
  }
});

expensesRouter.post('/', async (request, response, next) => {
  try {
    response.status(201).json(await createExpense(request.body));
  } catch (error) {
    next(error);
  }
});

expensesRouter.put('/:id', async (request, response, next) => {
  try {
    await updateExpense(request.params.id, request.body);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

expensesRouter.delete('/:id', async (request, response, next) => {
  try {
    await deleteExpense(request.params.id);
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});
