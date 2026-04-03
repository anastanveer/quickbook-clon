function toISODate(date) {
  return date.toISOString().slice(0, 10);
}

function daysAgo(days) {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - days);
  return toISODate(date);
}

export function createDefaultData() {
  return {
    settings: {
      company_name: "Craig's Design and Landscaping Services",
      logo_url: '',
    },
    capital_plan: {
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
    sales: [
      { id: 'sale-1', amount: 8200, date: daysAgo(26) },
      { id: 'sale-2', amount: 9100, date: daysAgo(23) },
      { id: 'sale-3', amount: 7600, date: daysAgo(20) },
      { id: 'sale-4', amount: 9800, date: daysAgo(18) },
      { id: 'sale-5', amount: 9400, date: daysAgo(15) },
      { id: 'sale-6', amount: 23200, date: daysAgo(12) },
      { id: 'sale-7', amount: 21400, date: daysAgo(9) },
      { id: 'sale-8', amount: 21900, date: daysAgo(7) },
      { id: 'sale-9', amount: 21700, date: daysAgo(4) },
      { id: 'sale-10', amount: 20600, date: daysAgo(2) },
      { id: 'sale-11', amount: 12400, date: daysAgo(38) },
      { id: 'sale-12', amount: 11800, date: daysAgo(47) },
      { id: 'sale-13', amount: 13200, date: daysAgo(58) },
      { id: 'sale-14', amount: 14500, date: daysAgo(74) },
      { id: 'sale-15', amount: 13900, date: daysAgo(91) },
      { id: 'sale-16', amount: 12800, date: daysAgo(110) },
    ],
    expenses: [
      {
        id: 'expense-1',
        category: 'Online Marketing',
        amount: 12000,
        note: 'Online Marketing',
        color: '#0f8f94',
        date: daysAgo(22),
      },
      {
        id: 'expense-2',
        category: 'Depreciation',
        amount: 4000,
        note: 'Depreciation',
        color: '#19adb2',
        date: daysAgo(17),
      },
      {
        id: 'expense-3',
        category: 'Subscription',
        amount: 1000,
        note: 'Subscription',
        color: '#2fd1d3',
        date: daysAgo(11),
      },
      {
        id: 'expense-4',
        category: 'Rent & Mortgage',
        amount: 6500,
        note: 'Rent & Mortgage',
        color: '#0b6f74',
        date: daysAgo(8),
      },
      {
        id: 'expense-5',
        category: 'Meals & Entertainment',
        amount: 1250,
        note: 'Meals & Entertainment',
        color: '#43d2d5',
        date: daysAgo(6),
      },
      {
        id: 'expense-6',
        category: 'Other',
        amount: 250,
        note: 'Other',
        color: '#7cdfe1',
        date: daysAgo(4),
      },
      {
        id: 'expense-7',
        category: 'Equipment',
        amount: 3100,
        note: 'Equipment',
        color: '#0d5f63',
        date: daysAgo(43),
      },
      {
        id: 'expense-8',
        category: 'Software',
        amount: 2400,
        note: 'Software',
        color: '#25c6c8',
        date: daysAgo(68),
      },
      {
        id: 'expense-9',
        category: 'Travel',
        amount: 2800,
        note: 'Travel',
        color: '#56d8da',
        date: daysAgo(96),
      },
    ],
    invoices: [
      {
        id: 'invoice-1',
        customer: 'Green Hill Estates',
        amount: 12000,
        status: 'overdue',
        due_date: daysAgo(10),
        created_at: daysAgo(39),
        paid_date: null,
        deposited: false,
      },
      {
        id: 'invoice-2',
        customer: 'Maple Avenue HOA',
        amount: 15000,
        status: 'overdue',
        due_date: daysAgo(6),
        created_at: daysAgo(22),
        paid_date: null,
        deposited: false,
      },
      {
        id: 'invoice-3',
        customer: 'Parkline Retail',
        amount: 8000,
        status: 'unpaid',
        due_date: daysAgo(-4),
        created_at: daysAgo(7),
        paid_date: null,
        deposited: false,
      },
      {
        id: 'invoice-4',
        customer: 'Bluebird Residences',
        amount: 6000,
        status: 'paid',
        due_date: daysAgo(18),
        created_at: daysAgo(28),
        paid_date: daysAgo(12),
        deposited: true,
      },
      {
        id: 'invoice-5',
        customer: 'Lakeview Offices',
        amount: 9000,
        status: 'paid',
        due_date: daysAgo(36),
        created_at: daysAgo(49),
        paid_date: daysAgo(30),
        deposited: false,
      },
      {
        id: 'invoice-6',
        customer: 'Grand Oak Villas',
        amount: 7000,
        status: 'paid',
        due_date: daysAgo(66),
        created_at: daysAgo(78),
        paid_date: daysAgo(60),
        deposited: true,
      },
    ],
  };
}
