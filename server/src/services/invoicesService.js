import crypto from 'crypto';
import { readDatabase, updateDatabase } from '../store/database.js';
import { broadcastEvent } from '../realtime/events.js';
import { isPast, isWithinDays, parseDays } from '../utils/dateRange.js';

function deriveStatus(payload) {
  if (payload.status) {
    return payload.status;
  }

  return isPast(payload.due_date) ? 'overdue' : 'unpaid';
}

function normalizeInvoice(payload) {
  return {
    customer: payload.customer || 'New Customer',
    amount: Number(payload.amount),
    status: deriveStatus(payload),
    due_date: payload.due_date,
    created_at: payload.created_at || new Date().toISOString().slice(0, 10),
    paid_date: payload.paid_date || null,
    deposited: Boolean(payload.deposited),
  };
}

function summarizeInvoices(items) {
  const unpaidItems = items.filter((item) => item.status !== 'paid');
  const paidItems = items.filter((item) => item.status === 'paid');

  const overdue = unpaidItems
    .filter((item) => item.status === 'overdue' || isPast(item.due_date))
    .reduce((sum, item) => sum + Number(item.amount), 0);

  const unpaid = unpaidItems.reduce((sum, item) => sum + Number(item.amount), 0);
  const notDueYet = Math.max(unpaid - overdue, 0);
  const paid = paidItems.reduce((sum, item) => sum + Number(item.amount), 0);
  const deposited = paidItems
    .filter((item) => item.deposited)
    .reduce((sum, item) => sum + Number(item.amount), 0);

  return {
    unpaid,
    overdue,
    notDueYet,
    paid,
    notDeposited: Math.max(paid - deposited, 0),
    deposited,
  };
}

export async function listInvoices(days) {
  const database = await readDatabase();
  const rangeDays = parseDays(days);
  const items = database.invoices
    .filter((item) => isWithinDays(item.created_at, rangeDays))
    .sort((left, right) => new Date(right.created_at) - new Date(left.created_at));

  return {
    items,
    summary: summarizeInvoices(items),
  };
}

export async function createInvoice(payload) {
  const invoice = {
    id: crypto.randomUUID(),
    ...normalizeInvoice(payload),
  };

  await updateDatabase((database) => {
    database.invoices.push(invoice);
    return database;
  });

  broadcastEvent({
    type: 'invoice.created',
    entity: 'invoices',
    id: invoice.id,
  });

  return invoice;
}

export async function updateInvoice(id, payload) {
  const normalized = normalizeInvoice(payload);

  await updateDatabase((database) => {
    database.invoices = database.invoices.map((invoice) =>
      invoice.id === id ? { ...invoice, ...normalized } : invoice
    );
    return database;
  });

  broadcastEvent({
    type: 'invoice.updated',
    entity: 'invoices',
    id,
  });
}

export async function deleteInvoice(id) {
  await updateDatabase((database) => {
    database.invoices = database.invoices.filter((invoice) => invoice.id !== id);
    return database;
  });

  broadcastEvent({
    type: 'invoice.deleted',
    entity: 'invoices',
    id,
  });
}
