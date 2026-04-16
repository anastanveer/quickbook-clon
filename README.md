⚡ Built as a real-world SaaS dashboard UI foundation for scalable business applications.
# QuickBooks-Style Dashboard (Phase 1 - Frontend)

A premium-quality, pixel-accurate QuickBooks-inspired business dashboard built with React, Tailwind CSS, and Recharts.

## 🎯 Overview

This is **Phase 1: UI Foundation** of a QuickBooks-style dashboard. It includes:
- ✅ Complete React component architecture
- ✅ Responsive dashboard layout
- ✅ Mock data for easy customization
- ✅ Professional SaaS UI styling
- ✅ Interactive charts and visualizations
- ✅ Zero backend dependencies (frontend only)

## 📁 Project Structure

```
/client-desh-1
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Sidebar.jsx       # Left navigation menu
│   │   ├── Header.jsx        # Top header with company name, search, notifications
│   │   ├── DashboardCard.jsx # Base card component wrapper
│   │   ├── StatCard.jsx      # Quick stats card (top row)
│   │   ├── ProgressBar.jsx   # Progress visualization component
│   │   ├── ProfitLossCard.jsx    # Profit/Loss with progress bars
│   │   ├── ExpensesCard.jsx  # Donut chart breakdown
│   │   ├── SalesCard.jsx     # Line chart visualization
│   │   ├── InvoicesCard.jsx  # Invoice summary & recent list
│   │   └── CapitalCard.jsx   # Growth steps tracker
│   ├── data/
│   │   └── dashboardData.js  # Mock data (EASY TO CHANGE)
│   ├── App.jsx               # Main app component
│   ├── index.css             # Tailwind directives & global styles
│   └── main.jsx              # React entry point
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS setup
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js            # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Running

```bash
cd /home/anas-tanveer/client-desh-1

# Install dependencies (already done)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

**Dev server runs on:** `http://localhost:5174/`

## 🎨 Design System

### Colors
- **Primary (Green):** `#22c55e` - Main brand color
- **Neutrals:** Full grayscale from 50-900
- **Semantic:** Red, Amber, Blue, Purple, Pink for data visualization

### Typography
- **Font Family:** Inter (imported from Google Fonts)
- **Base Size:** 16px
- **Line Height:** 1.5

### Spacing
- Uses 4px/8px base grid for consistency
- Padding, margins follow Tailwind defaults

### Components
- **Cards:** Rounded XL (rounded-xl) with soft shadows
- **Buttons:** Rounded LG with primary/secondary states
- **Inputs:** Subtle borders, neutral backgrounds

## 📊 Dashboard Sections

### 1. **Quick Stats (Top Row)**
Four stat cards showing key metrics:
- Total Revenue
- Total Expenses
- Net Profit
- Amount Due

### 2. **Profit & Loss Card**
- Net income display
- Revenue/Expenses progress bars
- Profit margin & expense ratio calculations

### 3. **Sales Overview Chart**
- 30-day line chart with smooth curves
- Total, average, and peak day stats
- Interactive tooltips

### 4. **Expense Breakdown**
- Donut/pie chart visualization
- Category breakdown with percentages
- Color-coded categories

### 5. **Invoices Summary**
- Payment collection progress
- Paid/Unpaid/Overdue breakdown
- Recent invoices list
- Status badges

### 6. **Capital & Growth**
- Progress tracker for growth steps
- Completed/pending milestones
- Actionable next steps

## 📝 Customizing Data

All mock data is in `/src/data/dashboardData.js`. Simply update the values:

```javascript
export const dashboardData = {
  revenue: 125000,        // Change to your value
  expenses: 48000,        // Update easily
  profit: 77000,          // Auto-calculated
  // ... more fields
};
```

**No backend changes needed** — just edit the JS object and refresh the browser!

## 🔧 Key Technologies

- **React 18:** Component-based UI
- **Vite:** Lightning-fast build tool
- **Tailwind CSS:** Utility-first styling
- **Recharts:** Interactive charts library
- **PostCSS:** CSS processing

## 📦 Components API

### Sidebar Component
```jsx
<Sidebar active={activeMenu} onMenuChange={setActiveMenu} />
```

### Header Component
```jsx
<Header companyName="Your Company" />
```

### StatCard Component
```jsx
<StatCard
  label="Revenue"
  value="$125,000"
  icon="📊"
  trend="12"
  trendDirection="up"
  color="primary"
/>
```

### DashboardCard (Wrapper)
```jsx
<DashboardCard title="Profit & Loss" icon="📊">
  {/* Content */}
</DashboardCard>
```

## 🎯 Phase 1 Scope (Complete)

✅ UI Layout & Components  
✅ Responsive Design  
✅ Mock Data Integration  
✅ Chart Visualizations  
✅ SaaS-Style Styling  
✅ Component Architecture  

## 📅 Future Phases (Phase 2+)

- 🔲 Backend API integration
- 🔲 Real database connection
- 🔲 Authentication & authorization
- 🔲 User accounts & multi-company support
- 🔲 Advanced filtering & date ranges
- 🔲 Export functionality (PDF, CSV)
- 🔲 Real-time data updates
- 🔲 Advanced reporting

## 🎨 Customization Examples

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
primary: {
  600: '#3b82f6', // Change green to blue
}
```

### Add New Dashboard Card
1. Create component in `/src/components/NewCard.jsx`
2. Import in `App.jsx`
3. Add to dashboard grid
4. Add mock data to `dashboardData.js`

### Modify Chart Data
Edit `dashboardData.js` salesData array to add/remove dates or change values.

## 📱 Responsive Behavior

- **Desktop:** Full 3-column layout
- **Tablet:** 2-column layout, cards stack
- **Mobile:** Single column, sidebar collapses

## 🔍 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## 📄 License

Phase 1 UI Foundation - For demonstration purposes

## 🤝 Next Steps

1. **Review the dashboard** at `http://localhost:5174/`
2. **Edit mock data** in `src/data/dashboardData.js`
3. **Customize styling** via Tailwind config
4. **Add new components** following the existing pattern
5. **Prepare for Phase 2** backend integration

## ✨ Quality Checklist

- ✅ Clean component architecture
- ✅ Responsive on all device sizes
- ✅ Accessible color contrast
- ✅ Smooth animations and transitions
- ✅ Consistent spacing & typography
- ✅ Easy to extend and maintain
- ✅ No hardcoded values (all in data file)
- ✅ Professional SaaS appearance

---

# QuickBooks-Style Dashboard (Phase 1 - Frontend)

A premium-quality, pixel-accurate QuickBooks-inspired business dashboard built with React, Tailwind CSS, and Recharts.

## 🎯 Overview

This is **Phase 1: UI Foundation** of a QuickBooks-style dashboard. It includes:
- ✅ Complete React component architecture
- ✅ Responsive dashboard layout
- ✅ Mock data for easy customization
- ✅ Professional SaaS UI styling
- ✅ Interactive charts and visualizations
- ✅ Zero backend dependencies (frontend only)

## 📁 Project Structure

```
/client-desh-1
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Sidebar.jsx       # Left navigation menu
│   │   ├── Header.jsx        # Top header with company name, search, notifications
│   │   ├── DashboardCard.jsx # Base card component wrapper
│   │   ├── StatCard.jsx      # Quick stats card (top row)
│   │   ├── ProgressBar.jsx   # Progress visualization component
│   │   ├── ProfitLossCard.jsx    # Profit/Loss with progress bars
│   │   ├── ExpensesCard.jsx  # Donut chart breakdown
│   │   ├── SalesCard.jsx     # Line chart visualization
│   │   ├── InvoicesCard.jsx  # Invoice summary & recent list
│   │   └── CapitalCard.jsx   # Growth steps tracker
│   ├── data/
│   │   └── dashboardData.js  # Mock data (EASY TO CHANGE)
│   ├── App.jsx               # Main app component
│   ├── index.css             # Tailwind directives & global styles
│   └── main.jsx              # React entry point
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS setup
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js            # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Running

```bash
cd /home/anas-tanveer/client-desh-1

# Install dependencies (already done)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

**Dev server runs on:** `http://localhost:5174/`

## 🎨 Design System

### Colors
- **Primary (Green):** `#22c55e` - Main brand color
- **Neutrals:** Full grayscale from 50-900
- **Semantic:** Red, Amber, Blue, Purple, Pink for data visualization

### Typography
- **Font Family:** Inter (imported from Google Fonts)
- **Base Size:** 16px
- **Line Height:** 1.5

### Spacing
- Uses 4px/8px base grid for consistency
- Padding, margins follow Tailwind defaults

### Components
- **Cards:** Rounded XL (rounded-xl) with soft shadows
- **Buttons:** Rounded LG with primary/secondary states
- **Inputs:** Subtle borders, neutral backgrounds

## 📊 Dashboard Sections

### 1. **Quick Stats (Top Row)**
Four stat cards showing key metrics:
- Total Revenue
- Total Expenses
- Net Profit
- Amount Due

### 2. **Profit & Loss Card**
- Net income display
- Revenue/Expenses progress bars
- Profit margin & expense ratio calculations

### 3. **Sales Overview Chart**
- 30-day line chart with smooth curves
- Total, average, and peak day stats
- Interactive tooltips

### 4. **Expense Breakdown**
- Donut/pie chart visualization
- Category breakdown with percentages
- Color-coded categories

### 5. **Invoices Summary**
- Payment collection progress
- Paid/Unpaid/Overdue breakdown
- Recent invoices list
- Status badges

### 6. **Capital & Growth**
- Progress tracker for growth steps
- Completed/pending milestones
- Actionable next steps

## 📝 Customizing Data

All mock data is in `/src/data/dashboardData.js`. Simply update the values:

```javascript
export const dashboardData = {
  revenue: 125000,        // Change to your value
  expenses: 48000,        // Update easily
  profit: 77000,          // Auto-calculated
  // ... more fields
};
```

**No backend changes needed** — just edit the JS object and refresh the browser!

## 🔧 Key Technologies

- **React 18:** Component-based UI
- **Vite:** Lightning-fast build tool
- **Tailwind CSS:** Utility-first styling
- **Recharts:** Interactive charts library
- **PostCSS:** CSS processing

## 📦 Components API

### Sidebar Component
```jsx
<Sidebar active={activeMenu} onMenuChange={setActiveMenu} />
```

### Header Component
```jsx
<Header companyName="Your Company" />
```

### StatCard Component
```jsx
<StatCard
  label="Revenue"
  value="$125,000"
  icon="📊"
  trend="12"
  trendDirection="up"
  color="primary"
/>
```

### DashboardCard (Wrapper)
```jsx
<DashboardCard title="Profit & Loss" icon="📊">
  {/* Content */}
</DashboardCard>
```

## 🎯 Phase 1 Scope (Complete)

✅ UI Layout & Components  
✅ Responsive Design  
✅ Mock Data Integration  
✅ Chart Visualizations  
✅ SaaS-Style Styling  
✅ Component Architecture  

## 📅 Future Phases (Phase 2+)

- 🔲 Backend API integration
- 🔲 Real database connection
- 🔲 Authentication & authorization
- 🔲 User accounts & multi-company support
- 🔲 Advanced filtering & date ranges
- 🔲 Export functionality (PDF, CSV)
- 🔲 Real-time data updates
- 🔲 Advanced reporting

## 🎨 Customization Examples

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
primary: {
  600: '#3b82f6', // Change green to blue
}
```

### Add New Dashboard Card
1. Create component in `/src/components/NewCard.jsx`
2. Import in `App.jsx`
3. Add to dashboard grid
4. Add mock data to `dashboardData.js`

### Modify Chart Data
Edit `dashboardData.js` salesData array to add/remove dates or change values.

## 📱 Responsive Behavior

- **Desktop:** Full 3-column layout
- **Tablet:** 2-column layout, cards stack
- **Mobile:** Single column, sidebar collapses

## 🔍 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## 📄 License

Phase 1 UI Foundation - For demonstration purposes

## 🤝 Next Steps

1. **Review the dashboard** at `http://localhost:5174/`
2. **Edit mock data** in `src/data/dashboardData.js`
3. **Customize styling** via Tailwind config
4. **Add new components** following the existing pattern
5. **Prepare for Phase 2** backend integration

## ✨ Quality Checklist

- ✅ Clean component architecture
- ✅ Responsive on all device sizes
- ✅ Accessible color contrast
- ✅ Smooth animations and transitions
- ✅ Consistent spacing & typography
- ✅ Easy to extend and maintain
- ✅ No hardcoded values (all in data file)
- ✅ Professional SaaS appearance

---

# QuickBooks-Style Dashboard (Phase 1 - Frontend)

A premium-quality, pixel-accurate QuickBooks-inspired business dashboard built with React, Tailwind CSS, and Recharts.

## 🎯 Overview

This is **Phase 1: UI Foundation** of a QuickBooks-style dashboard. It includes:
- ✅ Complete React component architecture
- ✅ Responsive dashboard layout
- ✅ Mock data for easy customization
- ✅ Professional SaaS UI styling
- ✅ Interactive charts and visualizations
- ✅ Zero backend dependencies (frontend only)

## 📁 Project Structure

```
/client-desh-1
├── src/
│   ├── components/           # Reusable React components
│   │   ├── Sidebar.jsx       # Left navigation menu
│   │   ├── Header.jsx        # Top header with company name, search, notifications
│   │   ├── DashboardCard.jsx # Base card component wrapper
│   │   ├── StatCard.jsx      # Quick stats card (top row)
│   │   ├── ProgressBar.jsx   # Progress visualization component
│   │   ├── ProfitLossCard.jsx    # Profit/Loss with progress bars
│   │   ├── ExpensesCard.jsx  # Donut chart breakdown
│   │   ├── SalesCard.jsx     # Line chart visualization
│   │   ├── InvoicesCard.jsx  # Invoice summary & recent list
│   │   └── CapitalCard.jsx   # Growth steps tracker
│   ├── data/
│   │   └── dashboardData.js  # Mock data (EASY TO CHANGE)
│   ├── App.jsx               # Main app component
│   ├── index.css             # Tailwind directives & global styles
│   └── main.jsx              # React entry point
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS setup
├── index.html                # HTML template
├── package.json              # Dependencies
└── vite.config.js            # Vite configuration
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Running

```bash
cd /home/anas-tanveer/client-desh-1

# Install dependencies (already done)
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview
```

**Dev server runs on:** `http://localhost:5174/`

## 🎨 Design System

### Colors
- **Primary (Green):** `#22c55e` - Main brand color
- **Neutrals:** Full grayscale from 50-900
- **Semantic:** Red, Amber, Blue, Purple, Pink for data visualization

### Typography
- **Font Family:** Inter (imported from Google Fonts)
- **Base Size:** 16px
- **Line Height:** 1.5

### Spacing
- Uses 4px/8px base grid for consistency
- Padding, margins follow Tailwind defaults

### Components
- **Cards:** Rounded XL (rounded-xl) with soft shadows
- **Buttons:** Rounded LG with primary/secondary states
- **Inputs:** Subtle borders, neutral backgrounds

## 📊 Dashboard Sections

### 1. **Quick Stats (Top Row)**
Four stat cards showing key metrics:
- Total Revenue
- Total Expenses
- Net Profit
- Amount Due

### 2. **Profit & Loss Card**
- Net income display
- Revenue/Expenses progress bars
- Profit margin & expense ratio calculations

### 3. **Sales Overview Chart**
- 30-day line chart with smooth curves
- Total, average, and peak day stats
- Interactive tooltips

### 4. **Expense Breakdown**
- Donut/pie chart visualization
- Category breakdown with percentages
- Color-coded categories

### 5. **Invoices Summary**
- Payment collection progress
- Paid/Unpaid/Overdue breakdown
- Recent invoices list
- Status badges

### 6. **Capital & Growth**
- Progress tracker for growth steps
- Completed/pending milestones
- Actionable next steps

## 📝 Customizing Data

All mock data is in `/src/data/dashboardData.js`. Simply update the values:

```javascript
export const dashboardData = {
  revenue: 125000,        // Change to your value
  expenses: 48000,        // Update easily
  profit: 77000,          // Auto-calculated
  // ... more fields
};
```

**No backend changes needed** — just edit the JS object and refresh the browser!

## 🔧 Key Technologies

- **React 18:** Component-based UI
- **Vite:** Lightning-fast build tool
- **Tailwind CSS:** Utility-first styling
- **Recharts:** Interactive charts library
- **PostCSS:** CSS processing

## 📦 Components API

### Sidebar Component
```jsx
<Sidebar active={activeMenu} onMenuChange={setActiveMenu} />
```

### Header Component
```jsx
<Header companyName="Your Company" />
```

### StatCard Component
```jsx
<StatCard
  label="Revenue"
  value="$125,000"
  icon="📊"
  trend="12"
  trendDirection="up"
  color="primary"
/>
```

### DashboardCard (Wrapper)
```jsx
<DashboardCard title="Profit & Loss" icon="📊">
  {/* Content */}
</DashboardCard>
```

## 🎯 Phase 1 Scope (Complete)

✅ UI Layout & Components  
✅ Responsive Design  
✅ Mock Data Integration  
✅ Chart Visualizations  
✅ SaaS-Style Styling  
✅ Component Architecture  

## 📅 Future Phases (Phase 2+)

- 🔲 Backend API integration
- 🔲 Real database connection
- 🔲 Authentication & authorization
- 🔲 User accounts & multi-company support
- 🔲 Advanced filtering & date ranges
- 🔲 Export functionality (PDF, CSV)
- 🔲 Real-time data updates
- 🔲 Advanced reporting

## 🎨 Customization Examples

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
primary: {
  600: '#3b82f6', // Change green to blue
}
```

### Add New Dashboard Card
1. Create component in `/src/components/NewCard.jsx`
2. Import in `App.jsx`
3. Add to dashboard grid
4. Add mock data to `dashboardData.js`

### Modify Chart Data
Edit `dashboardData.js` salesData array to add/remove dates or change values.

## 📱 Responsive Behavior

- **Desktop:** Full 3-column layout
- **Tablet:** 2-column layout, cards stack
- **Mobile:** Single column, sidebar collapses

## 🔍 Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions

## 📄 License

Phase 1 UI Foundation - For demonstration purposes

## 🤝 Next Steps

1. **Review the dashboard** at `http://localhost:5174/`
2. **Edit mock data** in `src/data/dashboardData.js`
3. **Customize styling** via Tailwind config
4. **Add new components** following the existing pattern
5. **Prepare for Phase 2** backend integration

## ✨ Quality Checklist

- ✅ Clean component architecture
- ✅ Responsive on all device sizes
- ✅ Accessible color contrast
- ✅ Smooth animations and transitions
- ✅ Consistent spacing & typography
- ✅ Easy to extend and maintain
- ✅ No hardcoded values (all in data file)
- ✅ Professional SaaS appearance

---

## 🤖 AI-Assisted Development

This project was built with the assistance of modern AI tools to improve development speed, structure, and code quality.

AI was used for:
- Component structuring ideas
- UI layout suggestions
- Code optimization patterns
- Documentation improvements

All final implementation, customization, and architecture decisions were reviewed and refined manually.

---


**Built with ❤️ for premium business dashboards.**
