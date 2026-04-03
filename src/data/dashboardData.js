export const dashboardData = {
  company: {
    name: "Craig's Design and Landscaping Services",
    subtitle: 'Business overview',
    logoUrl: '',
  },
  user: {
    name: 'Julia Daniels',
    initials: 'JD',
  },
  revenue: 95000,
  expenses: 38000,
  profit: 57000,
  profitComparison: {
    label: 'Net income for last 30 days',
    value: '',
  },
  expenseBudget: 38000,
  expenseCategories: [
    {
      name: 'Online Marketing',
      value: 12000,
      color: '#0f8f94',
      note: 'Online Marketing',
    },
    {
      name: 'Depreciation',
      value: 4000,
      color: '#19adb2',
      note: 'Depreciation',
    },
    {
      name: 'Subscription',
      value: 1000,
      color: '#2fd1d3',
      note: 'Subscription',
    },
  ],
  capitalPlan: {
    available: '$150K',
    steps: [
      {
        id: 'capital-1',
        title: 'Start your application',
        emoji: '📝',
      },
      {
        id: 'capital-2',
        title: 'Submit application',
        emoji: '📄',
      },
      {
        id: 'capital-3',
        title: 'Get a decision',
        emoji: '📊',
      },
    ],
  },
  invoicesSummary: {
    unpaid: 27000,
    overdue: 27000,
    notDueYet: 0,
    paid: 0,
    notDeposited: 0,
    deposited: 0,
  },
  invoices: [],
  salesSummary: {
    total: 95000,
  },
  salesData: [
    { date: '', amount: 18.2 },
    { date: '', amount: 19.1 },
    { date: '', amount: 17.7 },
    { date: '', amount: 19.8 },
    { date: '', amount: 19.3 },
    { date: '', amount: 23.2 },
    { date: '', amount: 21.4 },
    { date: '', amount: 21.9 },
    { date: '', amount: 21.7 },
    { date: '', amount: 20.6 },
  ],
};
