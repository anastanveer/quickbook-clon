import { readDatabase, updateDatabase } from '../store/database.js';
import { broadcastEvent } from '../realtime/events.js';

export async function getSettings() {
  const database = await readDatabase();
  return database.settings;
}

export async function updateSettings(payload) {
  const nextSettings = await updateDatabase((database) => {
    database.settings = {
      ...database.settings,
      ...(payload.company_name ? { company_name: payload.company_name } : {}),
      ...(Object.hasOwn(payload, 'logo_url') ? { logo_url: payload.logo_url } : {}),
    };
    return database;
  });

  broadcastEvent({
    type: 'settings.updated',
    entity: 'settings',
  });

  return nextSettings.settings;
}
