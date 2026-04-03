import React from 'react';
import DashboardCard from './DashboardCard';
import { formatCurrency } from '../utils/formatters';

export default function ProfitLossCard({
  revenue,
  expenses,
  profit,
  dateRange,
  dateRangeOptions,
  onDateRangeChange,
}) {
  const bars = [
    {
      label: 'Revenue',
      value: revenue,
      color: '#53b700',
      width: 78,
    },
    {
      label: 'Expenses',
      value: expenses,
      color: '#1bb7c9',
      width: 36,
    },
  ];

  return (
    <DashboardCard
      title="PROFIT AND LOSS"
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
        {formatCurrency(profit)}
      </p>
      <p className="mt-1 text-[15px] text-slate-500">Net income for last 30 days</p>

      <div className="mt-4 inline-flex items-center gap-2 rounded-sm bg-[#eff6fb] px-2.5 py-2 text-[12px] text-slate-600">
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1b92d1] text-[10px] font-semibold text-white">
          i
        </span>
        <span>100% categorized</span>
      </div>

      <div className="mt-9 space-y-8">
        {bars.map((bar) => (
          <div key={bar.label} className="flex items-center gap-4">
            <div className="w-[95px] shrink-0">
              <p className="text-[15px] font-semibold leading-none text-slate-800">
                {formatCurrency(bar.value)}
              </p>
              <p className="mt-1 text-[14px] text-slate-500">{bar.label}</p>
            </div>
            <div className="h-9 flex-1">
              <div
                className="h-9 rounded-[1px]"
                style={{
                  width: `${bar.width}%`,
                  backgroundColor: bar.color,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="mt-8 text-[14px] font-semibold text-[#1280c4]">
        See profit and loss report
      </button>
    </DashboardCard>
  );
}
