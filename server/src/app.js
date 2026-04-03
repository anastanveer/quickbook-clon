import cors from 'cors';
import express from 'express';
import { dashboardRouter } from './routes/dashboardRoutes.js';
import { salesRouter } from './routes/salesRoutes.js';
import { expensesRouter } from './routes/expensesRoutes.js';
import { invoicesRouter } from './routes/invoicesRoutes.js';
import { settingsRouter } from './routes/settingsRoutes.js';
import { eventsRouter } from './routes/eventsRoutes.js';

export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  app.get('/api/health', (_request, response) => {
    response.json({ ok: true });
  });

  app.use('/api/dashboard', dashboardRouter);
  app.use('/api/sales', salesRouter);
  app.use('/api/expenses', expensesRouter);
  app.use('/api/invoices', invoicesRouter);
  app.use('/api/settings', settingsRouter);
  app.use('/api/events', eventsRouter);

  app.use((error, _request, response) => {
    console.error(error);
    response.status(500).json({
      message: error.message || 'Internal server error',
    });
  });

  return app;
}
