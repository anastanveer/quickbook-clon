import { Router } from 'express';
import { setupEventStream } from '../realtime/events.js';

export const eventsRouter = Router();

eventsRouter.get('/', (request, response) => {
  const cleanup = setupEventStream(response);

  request.on('close', cleanup);
});
