import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import DashboardCard from './DashboardCard';
import { formatCurrency } from '../utils/formatters';

function formatSalesTick(value) {
  return `$${Math.round(value / 1000)}K`;
}

function buildSalesTicks(values) {
  if (!values.length) {
    return [0, 2000, 4000, 6000, 8000];
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const start = Math.max(0, Math.floor(min / 2000) * 2000 - 2000);
  const end = Math.ceil(max / 2000) * 2000 + 2000;
  const step = Math.max(2000, Math.ceil((end - start) / 5 / 1000) * 1000);
  const ticks = [];

  for (let current = start; current <= end; current += step) {
    ticks.push(current);
  }

  return ticks;
}

export default function SalesCard({
  data,
  summary,
  dateRange,
  dateRangeOptions,
  onDateRangeChange,
}) {
  const values = data.map((item) => Number(item.amount));
  const ticks = buildSalesTicks(values);

  return (
    <DashboardCard
      title="SALES"
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
      className="min-h-[364px]"
    >
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[42px] font-semibold leading-none text-slate-800">
            {formatCurrency(summary.total)}
          </p>
          <p className="mt-1 text-[15px] text-slate-500">Total sales</p>
        </div>
        <div className="text-[14px] text-slate-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-[3px] w-6 bg-[#53b700]" />
            Sales
          </span>
        </div>
      </div>

      <div className="mt-5 h-[236px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 10, left: 8, bottom: 2 }}>
            <CartesianGrid vertical={false} stroke="#e6e8eb" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={false} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 11 }}
              tickFormatter={formatSalesTick}
              domain={[ticks[0], ticks[ticks.length - 1]]}
              ticks={ticks}
              width={52}
              tickMargin={10}
              allowDecimals={false}
            />
            <Tooltip
              formatter={(value) => formatCurrency(value)}
              contentStyle={{
                borderRadius: '4px',
                border: '1px solid #d1d5db',
                boxShadow: '0 8px 20px rgba(15, 23, 42, 0.08)',
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#53b700"
              strokeWidth={3}
              dot={{ r: 4, fill: '#53b700', stroke: '#53b700' }}
              activeDot={{ r: 5, fill: '#53b700', stroke: '#ffffff', strokeWidth: 2 }}
            />
            <Legend wrapperStyle={{ display: 'none' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardCard>
  );
}
