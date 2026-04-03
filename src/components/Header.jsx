import React, { useState } from 'react';
import {
  BellIcon,
  GearIcon,
  HelpIcon,
  MenuIcon,
  SearchIcon,
  UserOutlineIcon,
} from './icons';

export default function Header({ companyName, user, onToggleSidebar }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-[56px] w-full max-w-[1620px] items-center justify-between px-4 sm:px-5 xl:px-7">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="text-slate-500 transition hover:text-slate-800"
            aria-label="Toggle sidebar"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
          <p className="max-w-[360px] truncate text-[13px] font-semibold tracking-[0.01em] text-slate-700">
            {companyName.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-4 text-[13px] text-slate-600">
          <button className="hidden items-center gap-1.5 lg:flex">
            <UserOutlineIcon className="h-5 w-5" />
            <span>My experts</span>
          </button>
          <button className="hidden items-center gap-1.5 lg:flex">
            <HelpIcon className="h-5 w-5" />
            <span>Help</span>
          </button>
          <button className="flex h-5 w-5 items-center justify-center text-slate-500 transition hover:text-slate-800">
            <SearchIcon className="h-5 w-5" />
          </button>
          <button className="flex h-5 w-5 items-center justify-center text-slate-500 transition hover:text-slate-800">
            <BellIcon className="h-5 w-5" />
          </button>
          <button className="flex h-5 w-5 items-center justify-center text-slate-500 transition hover:text-slate-800">
            <GearIcon className="h-5 w-5" />
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu((value) => !value)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-sky-200 via-sky-100 to-lime-100 ring-1 ring-slate-200"
            >
              <span className="text-[10px] font-semibold text-slate-700">{user.initials}</span>
            </button>

            {showUserMenu ? (
              <div className="absolute right-0 top-[calc(100%+8px)] w-48 rounded-md border border-slate-200 bg-white p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.08)]">
                {['Profile', 'Company settings', 'Manage users', 'Sign out'].map((item) => (
                  <button
                    key={item}
                    className="flex w-full rounded-sm px-3 py-2 text-left text-[13px] text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
