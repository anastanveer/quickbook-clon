import React from 'react';
import DashboardCard from './DashboardCard';

export default function ChartCard({
  title,
  subtitle,
  metric,
  metricLabel,
  trend,
  trendTone = 'positive',
  footerLabel,
  children,
}) {
  const trendClass =
    trendTone === 'positive'
      ? 'bg-[#e6f4ec] text-[#237b4b] ring-[#d6eadf]'
      : 'bg-[#fdecec] text-[#b74d4d] ring-[#f6d7d7]';

  return (
    <DashboardCard
      title={title}
      subtitle={subtitle}
      className="h-full"
      action={
        <div className="text-right">
          <p className="text-[11px] font-medium text-slate-500">{metricLabel}</p>
          <p className="mt-1 text-[20px] font-semibold text-slate-950">{metric}</p>
        </div>
      }
    >
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className={`rounded-sm px-2 py-1 text-[11px] font-semibold ring-1 ${trendClass}`}>
          {trend}
        </span>
        <p className="text-[12px] text-slate-500">{footerLabel}</p>
      </div>
      {children}
    </DashboardCard>
  );
}
