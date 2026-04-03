import React from 'react';
import DashboardCard from './DashboardCard';

export default function CapitalCard({ plan }) {
  return (
    <DashboardCard
      title="CAPITAL"
      action={<button className="text-[13px] font-semibold text-[#1280c4]">Hide</button>}
      className="min-h-[350px]"
    >
      <p className="max-w-[360px] text-[17px] leading-8 text-slate-700">
        You may be eligible for a loan up to{' '}
        <span className="font-semibold underline">{plan.available}</span>, depending on
        your business health and needs. Conditions apply
      </p>

      <div className="mt-11 flex items-start justify-between gap-3">
        {plan.steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex max-w-[104px] flex-col items-center text-center">
              <div className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-slate-300 bg-[#f3f4f6]">
                <div className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08)]">
                  <span className="text-[16px]">{step.emoji}</span>
                </div>
              </div>
              <p className="mt-4 text-[13px] leading-5 text-slate-700">{step.title}</p>
            </div>
            {index < plan.steps.length - 1 ? (
              <div className="mt-[28px] h-[2px] flex-1 bg-slate-300" />
            ) : null}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-12 flex items-center justify-between text-[14px] font-semibold">
        <button className="text-[#1280c4]">Connect accounts</button>
        <button className="inline-flex items-center gap-1 text-slate-700">
          Go to registers
        </button>
      </div>
    </DashboardCard>
  );
}
