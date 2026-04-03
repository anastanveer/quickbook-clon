import { createApp } from './src/app.js';
import { initDatabase } from './src/store/database.js';

const PORT = Number(process.env.API_PORT || 3001);

await initDatabase();

const app = createApp();

app.listen(PORT, () => {
  console.log(`API server listening on http://127.0.0.1:${PORT}`);
});
