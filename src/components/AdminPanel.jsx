import React, { useEffect, useState } from 'react';
import {
  createExpense,
  createInvoice,
  createSale,
  deleteExpense,
  deleteInvoice,
  deleteSale,
  getExpenses,
  getInvoices,
  getSales,
  updateExpense,
  updateInvoice,
  updateSale,
} from '../lib/api';
import { formatCurrency } from '../utils/formatters';

const tabs = [
  { id: 'invoices', label: 'Invoices' },
  { id: 'expenses', label: 'Expenses' },
  { id: 'sales', label: 'Sales' },
];

function emptyInvoiceForm() {
  return {
    customer: '',
    amount: '',
    status: 'unpaid',
    due_date: '',
    created_at: new Date().toISOString().slice(0, 10),
    paid_date: '',
    deposited: false,
  };
}

function emptyExpenseForm() {
  return {
    category: '',
    amount: '',
    date: new Date().toISOString().slice(0, 10),
    note: '',
    color: '#19adb2',
  };
}

function emptySaleForm() {
  return {
    amount: '',
    date: new Date().toISOString().slice(0, 10),
  };
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export default function AdminPanel({
  days,
  dateRange,
  dateRangeOptions = [],
  onDateRangeChange,
  onDataChanged,
  syncVersion = 0,
  initialTab = 'invoices',
  title = 'MANAGEMENT',
  showTabs = true,
}) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [invoiceForm, setInvoiceForm] = useState(emptyInvoiceForm);
  const [expenseForm, setExpenseForm] = useState(emptyExpenseForm);
  const [saleForm, setSaleForm] = useState(emptySaleForm);
  const [editingId, setEditingId] = useState(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [records, setRecords] = useState({
    invoices: [],
    expenses: [],
    sales: [],
  });

  const selectedTab = showTabs ? activeTab : initialTab;

  useEffect(() => {
    let isMounted = true;

    async function loadRecords() {
      try {
        const [invoicePayload, expensePayload, salesPayload] = await Promise.all([
          getInvoices(days),
          getExpenses(days),
          getSales(days),
        ]);

        if (!isMounted) {
          return;
        }

        setRecords({
          invoices: invoicePayload.items,
          expenses: expensePayload.items,
          sales: salesPayload.items,
        });
      } catch (error) {
        console.error('Failed to load admin data', error);
      }
    }

    loadRecords();

    return () => {
      isMounted = false;
    };
  }, [days, syncVersion]);

  async function refreshAll() {
    const [invoicePayload, expensePayload, salesPayload] = await Promise.all([
      getInvoices(days),
      getExpenses(days),
      getSales(days),
    ]);

    setRecords({
      invoices: invoicePayload.items,
      expenses: expensePayload.items,
      sales: salesPayload.items,
    });
    onDataChanged();
  }

  function resetFormForTab(tab) {
    setEditingId(null);
    if (tab === 'invoices') {
      setInvoiceForm(emptyInvoiceForm());
    }
    if (tab === 'expenses') {
      setExpenseForm(emptyExpenseForm());
    }
    if (tab === 'sales') {
      setSaleForm(emptySaleForm());
    }
  }

  function closeEditor() {
    resetFormForTab(selectedTab);
    setEditorOpen(false);
  }

  function openCreateEditor() {
    resetFormForTab(selectedTab);
    setEditorOpen(true);
  }

  async function handleInvoiceSubmit(event) {
    event.preventDefault();

    const payload = {
      ...invoiceForm,
      amount: Number(invoiceForm.amount),
      paid_date: invoiceForm.paid_date || null,
    };

    if (editingId) {
      await updateInvoice(editingId, payload);
    } else {
      await createInvoice(payload);
    }

    closeEditor();
    await refreshAll();
  }

  async function handleExpenseSubmit(event) {
    event.preventDefault();

    const payload = {
      ...expenseForm,
      amount: Number(expenseForm.amount),
    };

    if (editingId) {
      await updateExpense(editingId, payload);
    } else {
      await createExpense(payload);
    }

    closeEditor();
    await refreshAll();
  }

  async function handleSaleSubmit(event) {
    event.preventDefault();

    const payload = {
      ...saleForm,
      amount: Number(saleForm.amount),
    };

    if (editingId) {
      await updateSale(editingId, payload);
    } else {
      await createSale(payload);
    }

    closeEditor();
    await refreshAll();
  }

  function beginInvoiceEdit(item) {
    setEditingId(item.id);
    setInvoiceForm({
      customer: item.customer,
      amount: String(item.amount),
      status: item.status,
      due_date: item.due_date,
      created_at: item.created_at,
      paid_date: item.paid_date || '',
      deposited: Boolean(item.deposited),
    });
    setEditorOpen(true);
  }

  function beginExpenseEdit(item) {
    setEditingId(item.id);
    setExpenseForm({
      category: item.category,
      amount: String(item.amount),
      date: item.date,
      note: item.note || '',
      color: item.color || '#19adb2',
    });
    setEditorOpen(true);
  }

  function beginSaleEdit(item) {
    setEditingId(item.id);
    setSaleForm({
      amount: String(item.amount),
      date: item.date,
    });
    setEditorOpen(true);
  }

  async function removeRecord(type, id) {
    const confirmed = window.confirm('Delete this record?');
    if (!confirmed) {
      return;
    }

    if (type === 'invoices') {
      await deleteInvoice(id);
    }
    if (type === 'expenses') {
      await deleteExpense(id);
    }
    if (type === 'sales') {
      await deleteSale(id);
    }

    if (editingId === id) {
      closeEditor();
    }

    await refreshAll();
  }

  const currentConfig = getPanelConfig(selectedTab, {
    records,
    onEditInvoice: beginInvoiceEdit,
    onEditExpense: beginExpenseEdit,
    onEditSale: beginSaleEdit,
    onDelete: removeRecord,
  });

  return (
    <section className="mt-4">
      <div className="mb-4 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-[31px] font-normal leading-none text-slate-800">{title}</h1>
          <p className="mt-1 text-[13px] text-slate-500">
            Manage records for the selected period.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-[13px] text-slate-500">
            <span>Period</span>
            <select
              value={dateRange}
              onChange={(event) => onDateRangeChange?.(event.target.value)}
              className="h-9 rounded-[2px] border border-slate-300 bg-white px-3 text-[13px] text-slate-700 outline-none"
            >
              {dateRangeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={openCreateEditor}
            className="h-10 rounded-[2px] bg-[#53b700] px-4 text-[13px] font-semibold text-white"
          >
            {currentConfig.createLabel}
          </button>
        </div>
      </div>

      {showTabs ? (
        <div className="mb-4 flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setEditorOpen(false);
                resetFormForTab(tab.id);
              }}
              className={`rounded-[2px] border px-3 py-1.5 text-[13px] font-medium ${
                selectedTab === tab.id
                  ? 'border-[#53b700] bg-[#f4faeb] text-[#447a16]'
                  : 'border-slate-300 bg-white text-slate-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[2px] border border-[#dfe3e8] bg-white">
        <div className="border-b border-slate-200 bg-[#fbfcfd] px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[14px] font-semibold text-slate-700">{title}</p>
              <p className="mt-0.5 text-[12px] text-slate-500">
                Showing records for the last {days} days
              </p>
            </div>
            <p className="text-[12px] text-slate-400">{currentConfig.helperText}</p>
          </div>
        </div>

        <RecordTable
          columns={currentConfig.columns}
          rows={currentConfig.rows}
          emptyLabel={currentConfig.emptyLabel}
        />
      </div>

      {editorOpen ? (
        <EditorDrawer
          title={editingId ? currentConfig.editTitle : currentConfig.createTitle}
          description={currentConfig.drawerDescription}
          onClose={closeEditor}
        >
          {selectedTab === 'invoices' ? (
            <form className="flex h-full flex-col" onSubmit={handleInvoiceSubmit}>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <Field label="Customer">
                  <input
                    value={invoiceForm.customer}
                    onChange={(event) =>
                      setInvoiceForm((current) => ({
                        ...current,
                        customer: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <Field label="Amount">
                  <input
                    type="number"
                    value={invoiceForm.amount}
                    onChange={(event) =>
                      setInvoiceForm((current) => ({
                        ...current,
                        amount: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <Field label="Status">
                  <select
                    value={invoiceForm.status}
                    onChange={(event) =>
                      setInvoiceForm((current) => ({
                        ...current,
                        status: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  >
                    <option value="paid">Paid</option>
                    <option value="unpaid">Unpaid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </Field>
                <Field label="Due date">
                  <input
                    type="date"
                    value={invoiceForm.due_date}
                    onChange={(event) =>
                      setInvoiceForm((current) => ({
                        ...current,
                        due_date: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <Field label="Created at">
                  <input
                    type="date"
                    value={invoiceForm.created_at}
                    onChange={(event) =>
                      setInvoiceForm((current) => ({
                        ...current,
                        created_at: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <Field label="Paid date">
                  <input
                    type="date"
                    value={invoiceForm.paid_date}
                    onChange={(event) =>
                      setInvoiceForm((current) => ({
                        ...current,
                        paid_date: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <label className="flex items-center gap-2 text-[13px] text-slate-700">
                  <input
                    type="checkbox"
                    checked={invoiceForm.deposited}
                    onChange={(event) =>
                      setInvoiceForm((current) => ({
                        ...current,
                        deposited: event.target.checked,
                      }))
                    }
                  />
                  Deposited
                </label>
              </div>
              <DrawerActions editing={Boolean(editingId)} onClose={closeEditor} />
            </form>
          ) : null}

          {selectedTab === 'expenses' ? (
            <form className="flex h-full flex-col" onSubmit={handleExpenseSubmit}>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <Field label="Category">
                  <input
                    value={expenseForm.category}
                    onChange={(event) =>
                      setExpenseForm((current) => ({
                        ...current,
                        category: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <Field label="Amount">
                  <input
                    type="number"
                    value={expenseForm.amount}
                    onChange={(event) =>
                      setExpenseForm((current) => ({
                        ...current,
                        amount: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <Field label="Date">
                  <input
                    type="date"
                    value={expenseForm.date}
                    onChange={(event) =>
                      setExpenseForm((current) => ({
                        ...current,
                        date: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <Field label="Note">
                  <input
                    value={expenseForm.note}
                    onChange={(event) =>
                      setExpenseForm((current) => ({
                        ...current,
                        note: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <Field label="Color">
                  <input
                    type="color"
                    value={expenseForm.color}
                    onChange={(event) =>
                      setExpenseForm((current) => ({
                        ...current,
                        color: event.target.value,
                      }))
                    }
                    className="h-10 w-full rounded-[2px] border border-slate-300 bg-white px-2"
                  />
                </Field>
              </div>
              <DrawerActions editing={Boolean(editingId)} onClose={closeEditor} />
            </form>
          ) : null}

          {selectedTab === 'sales' ? (
            <form className="flex h-full flex-col" onSubmit={handleSaleSubmit}>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <Field label="Amount">
                  <input
                    type="number"
                    value={saleForm.amount}
                    onChange={(event) =>
                      setSaleForm((current) => ({
                        ...current,
                        amount: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
                <Field label="Date">
                  <input
                    type="date"
                    value={saleForm.date}
                    onChange={(event) =>
                      setSaleForm((current) => ({
                        ...current,
                        date: event.target.value,
                      }))
                    }
                    className={fieldClassName}
                  />
                </Field>
              </div>
              <DrawerActions editing={Boolean(editingId)} onClose={closeEditor} />
            </form>
          ) : null}
        </EditorDrawer>
      ) : null}
    </section>
  );
}

function getPanelConfig(
  selectedTab,
  { records, onEditInvoice, onEditExpense, onEditSale, onDelete }
) {
  if (selectedTab === 'invoices') {
    return {
      createLabel: '+ New invoice',
      createTitle: 'New invoice',
      editTitle: 'Edit invoice',
      drawerDescription: 'Create, update, and track customer invoices.',
      emptyLabel: 'No invoices found for this date range.',
      helperText: 'Customer billing',
      columns: ['Customer', 'Amount', 'Status', 'Due date'],
      rows: records.invoices.map((item) => ({
        id: item.id,
        values: [
          item.customer,
          formatCurrency(item.amount),
          <StatusBadge key={`status-${item.id}`} status={item.status} />,
          item.due_date,
        ],
        onEdit: () => onEditInvoice(item),
        onDelete: () => onDelete('invoices', item.id),
      })),
    };
  }

  if (selectedTab === 'expenses') {
    return {
      createLabel: '+ New expense',
      createTitle: 'New expense',
      editTitle: 'Edit expense',
      drawerDescription: 'Track business spending and category details.',
      emptyLabel: 'No expenses found for this date range.',
      helperText: 'Business spending',
      columns: ['Category', 'Amount', 'Date', 'Note'],
      rows: records.expenses.map((item) => ({
        id: item.id,
        values: [
          item.category,
          formatCurrency(item.amount),
          item.date,
          item.note || 'No note',
        ],
        onEdit: () => onEditExpense(item),
        onDelete: () => onDelete('expenses', item.id),
      })),
    };
  }

  return {
    createLabel: '+ New sale',
    createTitle: 'New sale',
    editTitle: 'Edit sale',
    drawerDescription: 'Record incoming sales for the selected date range.',
    emptyLabel: 'No sales found for this date range.',
    helperText: 'Income records',
    columns: ['Amount', 'Date'],
    rows: records.sales.map((item) => ({
      id: item.id,
      values: [formatCurrency(item.amount), item.date],
      onEdit: () => onEditSale(item),
      onDelete: () => onDelete('sales', item.id),
    })),
  };
}

function EditorDrawer({ title, description, onClose, children }) {
  return (
    <div className="fixed inset-0 z-40 bg-slate-900/20">
      <div className="absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col border-l border-slate-200 bg-white shadow-[-12px_0_24px_rgba(15,23,42,0.06)]">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-[18px] font-normal text-slate-800">{title}</p>
            <p className="mt-1 text-[12px] text-slate-500">{description}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[13px] font-medium text-slate-500"
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[13px] font-medium text-slate-600">{label}</span>
      {children}
    </label>
  );
}

function DrawerActions({ editing, onClose }) {
  return (
    <div className="flex items-center gap-2 border-t border-slate-200 px-6 py-4">
      <button
        type="submit"
        className="h-10 rounded-[2px] bg-[#53b700] px-4 text-[13px] font-semibold text-white"
      >
        {editing ? 'Update' : 'Create'}
      </button>
      <button
        type="button"
        onClick={onClose}
        className="h-10 rounded-[2px] border border-slate-300 px-4 text-[13px] font-medium text-slate-700"
      >
        Cancel
      </button>
    </div>
  );
}

function StatusBadge({ status }) {
  const tone =
    status === 'paid'
      ? 'bg-[#eef7e8] text-[#3b7d14]'
      : status === 'overdue'
        ? 'bg-[#fff0e8] text-[#b45309]'
        : 'bg-slate-100 text-slate-600';

  return (
    <span className={`inline-flex rounded-full px-2 py-1 text-[12px] font-medium ${tone}`}>
      {capitalize(status)}
    </span>
  );
}

function RecordTable({ columns, rows, emptyLabel }) {
  return (
    <div className="overflow-hidden">
      <table className="w-full border-collapse text-left">
        <thead className="bg-[#f9fafb]">
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="border-b border-slate-200 px-5 py-4 text-[12px] font-semibold text-slate-600"
              >
                {column}
              </th>
            ))}
            <th className="border-b border-slate-200 px-5 py-4 text-[12px] font-semibold text-slate-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-5 py-12 text-center text-[13px] text-slate-500"
              >
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-200 last:border-b-0">
                {row.values.map((value, index) => (
                  <td key={`${row.id}-${index}`} className="px-5 py-4 text-[13px] text-slate-700">
                    {value}
                  </td>
                ))}
                <td className="px-5 py-4 text-[13px]">
                  <div className="flex gap-3">
                    <button type="button" onClick={row.onEdit} className="text-[#1280c4]">
                      Edit
                    </button>
                    <button type="button" onClick={row.onDelete} className="text-[#c2410c]">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const fieldClassName =
  'h-10 w-full rounded-[2px] border border-slate-300 bg-white px-3 text-[13px] text-slate-700 outline-none';
