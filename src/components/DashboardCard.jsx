import React from 'react';

export default function DashboardCard({
  title,
  subtitle,
  action,
  className = '',
  children,
}) {
  return (
    <section className={`rounded-[2px] border border-[#dfe3e8] bg-white px-6 py-6 ${className}`}>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-[14px] font-semibold tracking-[0.08em] text-slate-700">{title}</p>
          {subtitle ? <p className="mt-0.5 text-[12px] text-slate-500">{subtitle}</p> : null}
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}
