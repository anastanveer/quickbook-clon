import React from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import DashboardCard from './DashboardCard';
import { formatCurrency } from '../utils/formatters';

export default function ExpensesCard({
  categories,
  totalBudget,
  dateRange,
  dateRangeOptions,
  onDateRangeChange,
}) {
  return (
    <DashboardCard
      title="EXPENSES"
      action={
        <select
          value={dateRange}
          onChange={(event) => onDateRangeChange(event.target.value)}
          className="border-none bg-transparent text-[14px] font-medium text-slate-500 outline-none"
        >
          {dateRangeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      }
      className="min-h-[350px]"
    >
      <p className="text-[42px] font-semibold leading-none text-slate-800">
        {formatCurrency(totalBudget)}
      </p>
      <p className="mt-1 text-[15px] text-slate-500">Total expenses</p>

      <div className="mt-7 grid grid-cols-[1fr_184px] items-center gap-3">
        <div className="space-y-4">
          {categories.slice(0, 3).map((category) => (
            <div key={category.name} className="flex items-start gap-3">
              <span
                className="mt-2 h-3.5 w-3.5 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <div>
                <p className="text-[15px] font-semibold leading-none text-slate-800">
                  {formatCurrency(category.value)}
                </p>
                <p className="mt-1 text-[13px] leading-5 text-slate-500">{category.note}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative h-[210px] w-[184px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categories}
                dataKey="value"
                innerRadius={52}
                outerRadius={84}
                stroke="none"
              >
                {categories.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardCard>
  );
}
