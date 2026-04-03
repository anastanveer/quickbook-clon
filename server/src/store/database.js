import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createDefaultData } from '../data/defaultData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.resolve(__dirname, '../../data');
const dbPath = path.join(dataDir, 'db.json');

export async function initDatabase() {
  await fs.mkdir(dataDir, { recursive: true });

  try {
    await fs.access(dbPath);
  } catch {
    await writeDatabase(createDefaultData());
  }
}

export async function readDatabase() {
  await initDatabase();
  const raw = await fs.readFile(dbPath, 'utf8');
  return JSON.parse(raw);
}

export async function writeDatabase(data) {
  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(dbPath, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

export async function updateDatabase(mutator) {
  const database = await readDatabase();
  const nextDatabase = await mutator(database);
  await writeDatabase(nextDatabase);
  return nextDatabase;
}
