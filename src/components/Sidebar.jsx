import React from 'react';
import {
  ChartIcon,
  ChevronRightIcon,
  DollarIcon,
  FileIcon,
  LedgerIcon,
  ReceiptIcon,
} from './icons';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: ChartIcon },
  { id: 'invoicing', label: 'Invoicing', icon: FileIcon },
  { id: 'sales', label: 'Sales', icon: DollarIcon },
  { id: 'expenses', label: 'Expenses', icon: ReceiptIcon },
  { id: 'accounting', label: 'Accounting', icon: LedgerIcon },
];

export default function Sidebar({ active, collapsed = false, onMenuChange }) {
  return (
    <aside
      className={`sticky top-0 hidden h-screen shrink-0 flex-col bg-[#2f3037] transition-[width] duration-200 ease-linear lg:flex ${
        collapsed ? 'w-[72px]' : 'w-[252px]'
      }`}
    >
      <div className={`${collapsed ? 'px-3' : 'px-7'} pb-6 pt-5 transition-all duration-200`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#53b700] text-white">
            <span className="text-[18px] font-semibold leading-none">qb</span>
          </div>
          {!collapsed ? (
            <div className="leading-none text-white">
              <p className="text-[10px] font-medium uppercase tracking-[0.08em] text-slate-300">
                Intuit
              </p>
              <p className="text-[16px] font-semibold">quickbooks</p>
            </div>
          ) : null}
        </div>

        <button
          className={`mt-7 flex h-[44px] items-center justify-center gap-2 rounded-full border-[3px] border-white/70 text-[15px] font-semibold text-white ${
            collapsed ? 'w-[44px] mx-auto' : 'w-full'
          }`}
          title="New"
        >
          <span className="text-[20px] leading-none">+</span>
          {!collapsed ? <span>New</span> : null}
        </button>
      </div>

      <nav className="flex-1">
        <ul className="space-y-[1px]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const activeState = active === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => onMenuChange(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`group relative flex w-full items-center ${
                    collapsed ? 'justify-center px-0' : 'justify-between px-5'
                  } py-[11px] text-left text-[13px] transition-colors ${
                    activeState ? 'bg-black text-white' : 'text-[#d3d7de] hover:bg-black/20'
                  }`}
                >
                  <span className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
                    <Icon className="h-[15px] w-[15px]" />
                    {!collapsed ? <span>{item.label}</span> : null}
                  </span>
                  {!collapsed && !activeState ? (
                    <ChevronRightIcon className="h-4 w-4 text-[#8f96a1]" />
                  ) : null}
                  {collapsed ? (
                    <span className="pointer-events-none absolute left-[78px] top-1/2 hidden -translate-y-1/2 whitespace-nowrap rounded-sm bg-[#1f2126] px-2 py-1 text-[12px] text-white group-hover:block">
                      {item.label}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
