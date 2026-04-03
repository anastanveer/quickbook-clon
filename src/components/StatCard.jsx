import React from 'react';
import { formatCurrency } from '../utils/formatters';

const toneClasses = {
  teal: 'bg-[#e6f4ec] text-[#237b4b] ring-[#d6eadf]',
  amber: 'bg-[#fbf2de] text-[#8a6220] ring-[#f3e5c2]',
  slate: 'bg-slate-100 text-slate-700 ring-slate-200',
};

export default function StatCard({ label, value, delta, tone = 'teal' }) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3.5 py-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[12px] font-medium text-slate-500">{label}</p>
        <span className={`rounded-sm px-2 py-0.5 text-[10px] font-semibold ring-1 ${toneClasses[tone]}`}>
          {delta}
        </span>
      </div>
      <p className="mt-2 text-[22px] font-semibold text-slate-950">{formatCurrency(value)}</p>
    </div>
  );
}
