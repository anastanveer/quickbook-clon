const clients = new Set();

function formatEvent(payload) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

export function registerEventClient(response) {
  clients.add(response);
  response.write(formatEvent({ type: 'connected', timestamp: Date.now() }));
}

export function unregisterEventClient(response) {
  clients.delete(response);
}

export function broadcastEvent(payload) {
  const message = formatEvent({
    timestamp: Date.now(),
    ...payload,
  });

  clients.forEach((client) => {
    client.write(message);
  });
}

export function setupEventStream(response) {
  response.setHeader('Content-Type', 'text/event-stream');
  response.setHeader('Cache-Control', 'no-cache, no-transform');
  response.setHeader('Connection', 'keep-alive');
  response.flushHeaders?.();

  registerEventClient(response);

  const heartbeat = setInterval(() => {
    response.write(': keep-alive\n\n');
  }, 20000);

  return () => {
    clearInterval(heartbeat);
    unregisterEventClient(response);
  };
}
