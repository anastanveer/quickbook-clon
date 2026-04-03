import React from 'react';

export default function ProgressBar({
  label,
  value,
  max = 100,
  colorClass = 'bg-[#2ca01c]',
  trackClass = 'bg-[#edf1f5]',
  valueLabel,
  detail,
}) {
  const percentage = max > 0 ? Math.min((value / max) * 100, 100) : 0;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[13px] font-medium text-slate-700">{label}</p>
          {detail ? <p className="text-[11px] text-slate-400">{detail}</p> : null}
        </div>
        {valueLabel ? <span className="text-[13px] font-semibold text-slate-900">{valueLabel}</span> : null}
      </div>
      <div className={`h-2 overflow-hidden rounded-full ${trackClass}`}>
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
