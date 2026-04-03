import { readDatabase } from '../store/database.js';
import { listExpenses } from './expensesService.js';
import { listInvoices } from './invoicesService.js';
import { listSales } from './salesService.js';

export async function getDashboard(days) {
  const database = await readDatabase();
  const [sales, expenses, invoices] = await Promise.all([
    listSales(days),
    listExpenses(days),
    listInvoices(days),
  ]);

  return {
    settings: database.settings,
    capitalPlan: database.capital_plan,
    profitLoss: {
      revenue: sales.summary.total,
      expenses: expenses.total,
      profit: sales.summary.total - expenses.total,
    },
    expenses: {
      totalBudget: expenses.total,
      categories: expenses.categories,
    },
    invoices: {
      items: invoices.items,
      summary: invoices.summary,
    },
    sales: {
      summary: sales.summary,
      data: sales.chartData,
    },
  };
}
