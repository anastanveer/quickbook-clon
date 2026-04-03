import crypto from 'crypto';
import { broadcastEvent } from '../realtime/events.js';
import { readDatabase, updateDatabase } from '../store/database.js';
import { isWithinDays, parseDays } from '../utils/dateRange.js';

function normalizeExpense(payload) {
  return {
    category: payload.category,
    amount: Number(payload.amount),
    date: payload.date,
    note: payload.note || payload.category,
    color: payload.color || '#19adb2',
  };
}

export async function listExpenses(days) {
  const database = await readDatabase();
  const rangeDays = parseDays(days);
  const items = database.expenses
    .filter((item) => isWithinDays(item.date, rangeDays))
    .sort((left, right) => new Date(right.date) - new Date(left.date));

  const grouped = new Map();
  items.forEach((item) => {
    const existing = grouped.get(item.category) || {
      name: item.category,
      note: item.note || item.category,
      color: item.color || '#19adb2',
      value: 0,
    };
    existing.value += Number(item.amount);
    grouped.set(item.category, existing);
  });

  const categories = [...grouped.values()]
    .sort((left, right) => right.value - left.value)
    .slice(0, 3);

  return {
    items,
    total: items.reduce((sum, item) => sum + Number(item.amount), 0),
    categories,
  };
}

export async function createExpense(payload) {
  const expense = {
    id: crypto.randomUUID(),
    ...normalizeExpense(payload),
  };

  await updateDatabase((database) => {
    database.expenses.push(expense);
    return database;
  });

  broadcastEvent({
    type: 'expense.created',
    entity: 'expenses',
    id: expense.id,
  });

  return expense;
}

export async function updateExpense(id, payload) {
  const normalized = normalizeExpense(payload);

  await updateDatabase((database) => {
    database.expenses = database.expenses.map((expense) =>
      expense.id === id ? { ...expense, ...normalized } : expense
    );
    return database;
  });

  broadcastEvent({
    type: 'expense.updated',
    entity: 'expenses',
    id,
  });
}

export async function deleteExpense(id) {
  await updateDatabase((database) => {
    database.expenses = database.expenses.filter((expense) => expense.id !== id);
    return database;
  });

  broadcastEvent({
    type: 'expense.deleted',
    entity: 'expenses',
    id,
  });
}
