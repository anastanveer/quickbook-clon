import crypto from 'crypto';
import { broadcastEvent } from '../realtime/events.js';
import { readDatabase, updateDatabase } from '../store/database.js';
import { bucketSalesData, isWithinDays, parseDays } from '../utils/dateRange.js';

function normalizeSale(payload) {
  return {
    amount: Number(payload.amount),
    date: payload.date,
  };
}

export async function listSales(days) {
  const database = await readDatabase();
  const rangeDays = parseDays(days);
  const items = database.sales
    .filter((item) => isWithinDays(item.date, rangeDays))
    .sort((left, right) => new Date(left.date) - new Date(right.date));

  return {
    items,
    chartData: bucketSalesData(items),
    summary: {
      total: items.reduce((sum, item) => sum + Number(item.amount), 0),
    },
  };
}

export async function createSale(payload) {
  const sale = {
    id: crypto.randomUUID(),
    ...normalizeSale(payload),
  };

  await updateDatabase((database) => {
    database.sales.push(sale);
    return database;
  });

  broadcastEvent({
    type: 'sale.created',
    entity: 'sales',
    id: sale.id,
  });

  return sale;
}

export async function updateSale(id, payload) {
  const normalized = normalizeSale(payload);

  await updateDatabase((database) => {
    database.sales = database.sales.map((sale) =>
      sale.id === id ? { ...sale, ...normalized } : sale
    );
    return database;
  });

  broadcastEvent({
    type: 'sale.updated',
    entity: 'sales',
    id,
  });
}

export async function deleteSale(id) {
  await updateDatabase((database) => {
    database.sales = database.sales.filter((sale) => sale.id !== id);
    return database;
  });

  broadcastEvent({
    type: 'sale.deleted',
    entity: 'sales',
    id,
  });
}
