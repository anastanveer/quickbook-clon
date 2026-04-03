import React from 'react';
import DashboardCard from './DashboardCard';
import { formatCurrency } from '../utils/formatters';

export default function InvoicesCard({ summary }) {
  return (
    <DashboardCard title="INVOICES" className="min-h-[364px]">
      <div className="flex items-center justify-between text-[15px] text-slate-600">
        <span>{formatCurrency(summary.unpaid)} Unpaid</span>
        <span>Last 365 days</span>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[38px] font-semibold leading-none text-slate-800">
            {formatCurrency(summary.overdue)}
          </p>
          <p className="mt-1 text-[15px] text-slate-500">Overdue</p>
        </div>
        <div className="text-right">
          <p className="text-[38px] font-semibold leading-none text-slate-800">
            {formatCurrency(summary.notDueYet)}
          </p>
          <p className="mt-1 text-[15px] text-slate-500">Not due yet</p>
        </div>
      </div>

      <div className="mt-6 h-[38px] overflow-hidden rounded-[1px] bg-[#eef1f5]">
        <div
          className="h-full bg-[#ff8500]"
          style={{ width: `${Math.max((summary.overdue / summary.unpaid) * 100, 12)}%` }}
        />
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6">
        <div className="flex items-center justify-between text-[15px] text-slate-600">
          <span>{formatCurrency(summary.paid)} Paid</span>
          <span>Last 30 days</span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div>
            <p className="text-[31px] font-semibold leading-none text-slate-800">
              {formatCurrency(summary.notDeposited)}
            </p>
            <p className="mt-1 text-[15px] text-slate-500">Not deposited</p>
          </div>
          <div className="text-right">
            <p className="text-[31px] font-semibold leading-none text-slate-800">
              {formatCurrency(summary.deposited)}
            </p>
            <p className="mt-1 text-[15px] text-slate-500">Deposited</p>
          </div>
        </div>

        <div className="mt-6 h-[18px] overflow-hidden rounded-[1px] bg-[#eef1f5]">
          <div
            className="h-full bg-[#53b700]"
            style={{ width: `${summary.paid > 0 ? (summary.deposited / summary.paid) * 100 : 0}%` }}
          />
        </div>
      </div>
    </DashboardCard>
  );
}
