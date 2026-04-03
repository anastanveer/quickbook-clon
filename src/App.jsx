import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Layout from './components/Layout';
import ProfitLossCard from './components/ProfitLossCard';
import ExpensesCard from './components/ExpensesCard';
import CapitalCard from './components/CapitalCard';
import InvoicesCard from './components/InvoicesCard';
import SalesCard from './components/SalesCard';
import AdminPanel from './components/AdminPanel';
import SettingsPanel from './components/SettingsPanel';
import { dashboardData } from './data/dashboardData';
import { getDashboard, subscribeToRealtimeEvents, updateSettings } from './lib/api';

const overviewTabs = ['Get things done', 'Business overview'];
const dateRangeOptions = [
  'Last 30 days',
  'Last 60 days',
  'Last 90 days',
  'Last 120 days',
];

function getDaysFromRange(rangeLabel) {
  return Number(rangeLabel.match(/\d+/)?.[0] || 30);
}

function createInitialDashboardState() {
  return {
    settings: {
      company_name: dashboardData.company.name,
      logo_url: dashboardData.company.logoUrl || '',
    },
    capitalPlan: dashboardData.capitalPlan,
    profitLoss: {
      revenue: dashboardData.revenue,
      expenses: dashboardData.expenses,
      profit: dashboardData.profit,
    },
    expenses: {
      totalBudget: dashboardData.expenseBudget,
      categories: dashboardData.expenseCategories,
    },
    invoices: {
      items: dashboardData.invoices,
      summary: dashboardData.invoicesSummary,
    },
    sales: {
      summary: dashboardData.salesSummary,
      data: dashboardData.salesData,
    },
  };
}

export default function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [dateRange, setDateRange] = useState(() => {
    if (typeof window === 'undefined') {
      return 'Last 30 days';
    }

    return window.localStorage.getItem('qb-date-range') || 'Last 30 days';
  });
  const [dashboard, setDashboard] = useState(createInitialDashboardState);
  const [realtimeVersion, setRealtimeVersion] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem('qb-sidebar-collapsed') === 'true';
  });
  const logoInputRef = useRef(null);
  const dateRangeRef = useRef(dateRange);

  useEffect(() => {
    dateRangeRef.current = dateRange;
  }, [dateRange]);

  useEffect(() => {
    window.localStorage.setItem('qb-sidebar-collapsed', String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  useEffect(() => {
    window.localStorage.setItem('qb-date-range', dateRange);
  }, [dateRange]);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboard() {
      try {
        const payload = await getDashboard(getDaysFromRange(dateRange));
        if (isMounted) {
          setDashboard(payload);
        }
      } catch (error) {
        console.error('Failed to load dashboard', error);
      }
    }

    loadDashboard();
    const intervalId = window.setInterval(loadDashboard, 15000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [dateRange]);

  async function refreshDashboard() {
    try {
      const payload = await getDashboard(getDaysFromRange(dateRangeRef.current));
      setDashboard(payload);
    } catch (error) {
      console.error('Failed to refresh dashboard', error);
    }
  }

  useEffect(() => {
    const unsubscribe = subscribeToRealtimeEvents((event) => {
      if (event.type === 'connected') {
        return;
      }

      setRealtimeVersion((current) => current + 1);
      getDashboard(getDaysFromRange(dateRangeRef.current))
        .then((payload) => {
          setDashboard(payload);
        })
        .catch((error) => {
          console.error('Failed to refresh dashboard from realtime event', error);
        });
    });

    return unsubscribe;
  }, []);

  async function handleCompanyNameEdit() {
    const nextName = window.prompt(
      'Update company name',
      dashboard.settings.company_name
    );
    if (!nextName || !nextName.trim()) {
      return;
    }

    try {
      const settings = await updateSettings({
        company_name: nextName.trim(),
        logo_url: dashboard.settings.logo_url,
      });
      setDashboard((current) => ({
        ...current,
        settings,
      }));
    } catch (error) {
      console.error('Failed to update company name', error);
    }
  }

  async function handleLogoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result !== 'string') {
        return;
      }

      try {
        const settings = await updateSettings({
          company_name: dashboard.settings.company_name,
          logo_url: reader.result,
        });
        setDashboard((current) => ({
          ...current,
          settings,
        }));
      } catch (error) {
        console.error('Failed to update logo', error);
      }
    };
    reader.readAsDataURL(file);
  }

  function renderDashboardView() {
    return (
      <>
        <section className="border-b border-[#dfe3e8] pb-1">
          <div className="flex items-start justify-between gap-4 pb-4">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => logoInputRef.current?.click()}
                className="flex h-[78px] w-[66px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-[2px] border border-[#d4d8de] bg-white text-slate-500"
                title="Click to upload logo"
              >
                {dashboard.settings.logo_url ? (
                  <img
                    src={dashboard.settings.logo_url}
                    alt={`${dashboard.settings.company_name} logo`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <>
                    <span className="text-[16px] leading-none">+</span>
                    <span className="mt-1 text-[12px] font-semibold">LOGO</span>
                  </>
                )}
              </button>
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoUpload}
              />
              <div className="pt-3">
                <button
                  type="button"
                  onClick={handleCompanyNameEdit}
                  className="text-left text-[20px] font-normal text-slate-700"
                  title="Click to edit company name"
                >
                  {dashboard.settings.company_name}
                </button>
              </div>
            </div>

            <div className="hidden items-center gap-2 pt-1 text-[12px] text-slate-400 lg:flex">
              <span>Privacy</span>
              <span className="relative inline-flex h-5 w-9 rounded-full bg-slate-300">
                <span className="absolute right-[2px] top-[2px] h-4 w-4 rounded-full bg-white" />
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8 text-[13px]">
            {overviewTabs.map((tab) => {
              const active = tab === 'Business overview';
              return (
                <button
                  key={tab}
                  className={`relative pb-[11px] ${
                    active ? 'font-semibold text-slate-800' : 'text-slate-400'
                  }`}
                >
                  {tab}
                  {active ? (
                    <span className="absolute inset-x-0 bottom-0 h-[4px] rounded-full bg-[#53b700]" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid gap-4 xl:grid-cols-3">
          <ProfitLossCard
            dateRange={dateRange}
            dateRangeOptions={dateRangeOptions}
            onDateRangeChange={setDateRange}
            revenue={dashboard.profitLoss.revenue}
            expenses={dashboard.profitLoss.expenses}
            profit={dashboard.profitLoss.profit}
          />
          <ExpensesCard
            dateRange={dateRange}
            dateRangeOptions={dateRangeOptions}
            onDateRangeChange={setDateRange}
            categories={dashboard.expenses.categories}
            totalBudget={dashboard.expenses.totalBudget}
          />
          <CapitalCard plan={dashboard.capitalPlan} />
        </section>

        <section className="mt-4 grid gap-4 xl:grid-cols-3">
          <InvoicesCard summary={dashboard.invoices.summary} />
          <div className="xl:col-span-2">
            <SalesCard
              data={dashboard.sales.data}
              dateRange={dateRange}
              dateRangeOptions={dateRangeOptions}
              onDateRangeChange={setDateRange}
              summary={dashboard.sales.summary}
            />
          </div>
        </section>
      </>
    );
  }

  function renderActiveSection() {
    if (activeSection === 'dashboard') {
      return renderDashboardView();
    }

    if (activeSection === 'invoicing') {
      return (
        <AdminPanel
          key="invoicing-management"
          days={getDaysFromRange(dateRange)}
          dateRange={dateRange}
          dateRangeOptions={dateRangeOptions}
          onDateRangeChange={setDateRange}
          onDataChanged={refreshDashboard}
          syncVersion={realtimeVersion}
          initialTab="invoices"
          title="Invoices"
          showTabs={false}
        />
      );
    }

    if (activeSection === 'expenses') {
      return (
        <AdminPanel
          key="expenses-management"
          days={getDaysFromRange(dateRange)}
          dateRange={dateRange}
          dateRangeOptions={dateRangeOptions}
          onDateRangeChange={setDateRange}
          onDataChanged={refreshDashboard}
          syncVersion={realtimeVersion}
          initialTab="expenses"
          title="Expenses"
          showTabs={false}
        />
      );
    }

    if (activeSection === 'sales') {
      return (
        <AdminPanel
          key="sales-management"
          days={getDaysFromRange(dateRange)}
          dateRange={dateRange}
          dateRangeOptions={dateRangeOptions}
          onDateRangeChange={setDateRange}
          onDataChanged={refreshDashboard}
          syncVersion={realtimeVersion}
          initialTab="sales"
          title="Sales"
          showTabs={false}
        />
      );
    }

    if (activeSection === 'accounting') {
      return (
        <SettingsPanel
          key="settings-management"
          settings={dashboard.settings}
          onSettingsUpdated={(settings) =>
            setDashboard((current) => ({
              ...current,
              settings,
            }))
          }
        />
      );
    }

    return renderDashboardView();
  }

  return (
    <div className="min-h-screen bg-[#f5f6f8] text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar
          active={activeSection}
          collapsed={sidebarCollapsed}
          onMenuChange={setActiveSection}
        />
        <Layout>
          <Header
            companyName={dashboard.settings.company_name}
            user={dashboardData.user}
            onToggleSidebar={() => setSidebarCollapsed((value) => !value)}
          />

          <main className="mx-auto w-full max-w-[1600px] px-4 pb-8 pt-3 sm:px-5 xl:px-6">
            {renderActiveSection()}
          </main>
        </Layout>
      </div>
    </div>
  );
}
