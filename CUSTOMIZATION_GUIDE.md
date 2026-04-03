# Customization Guide - QuickBooks Dashboard

Quick reference for making common changes without touching React code.

## 📊 Updating Dashboard Data

All mock data lives in one file: **`src/data/dashboardData.js`**

### Revenue & Expenses
```javascript
export const dashboardData = {
  revenue: 125000,      // Change this
  expenses: 48000,      // Change this
  profit: 77000,        // Auto-calculated (you can update too)
```

**Results in:**
- ProfitLossCard updates
- StatCards recalculate
- All percentages refresh (profit margin, etc.)

### Sales Chart Data
```javascript
salesData: [
  { date: 'Mar 1', amount: 8200 },
  { date: 'Mar 4', amount: 9500 },
  // Add more dates, or edit amounts
  // Chart updates automatically
],
```

**Tips:**
- Keep dates in order (ascending)
- Use any date format (Aug 15, 8/15, etc.)
- Chart stretches/shrinks based on data length

### Expense Categories
```javascript
expenseCategories: [
  { name: 'Payroll', value: 18000, color: '#22c55e' },
  { name: 'Utilities', value: 8500, color: '#3b82f6' },
  // Add more categories here
  // Pie chart & legend auto-update
],
```

**Color codes you can use:**
- `#22c55e` - Green (primary)
- `#3b82f6` - Blue
- `#f59e0b` - Amber/Yellow
- `#8b5cf6` - Purple
- `#ec4899` - Pink
- `#ef4444` - Red

### Invoice Data
```javascript
invoices: [
  { 
    id: 'INV-001', 
    client: 'Acme Corp', 
    amount: 5200, 
    status: 'paid',        // 'paid' | 'unpaid' | 'overdue'
    date: '2026-03-20' 
  },
  // Add/remove invoices
  // Recent list shows last 3 automatically
],
```

**Status options:**
- `'paid'` - Green badge
- `'unpaid'` - Yellow badge
- `'overdue'` - Red badge

### Capital Growth Steps
```javascript
capitalSteps: [
  { 
    id: 1, 
    title: 'Increase Cash', 
    description: 'Add company funds for growth' 
  },
]
```

## 🎨 Changing Company Info

In `src/App.jsx` change:
```jsx
<Header companyName="Northstar Books LLC" />
```

To your company:
```jsx
<Header companyName="Your Company Name" />
```

### Changing Company Logo
In `src/App.jsx`:

```jsx
<Header
  companyName="Northstar Books LLC"
  companyInitials="NS"
  ...
/>
```

Change `NS` to your company initials:
```jsx
<Header companyInitials="GC" />  // For "Green Corp"
```

## 😎 �pdating Colors

### Primary Green Brand Color
Edit `tailwind.config.js`:
```javascript
extend: {
  colors: {
    brand: {
      50: '#f0fdf4',
      100: '#dcf7e6',
      500: '#22c55e',  // Main green - change this
      600: '#16a34a',
    }
  }
}
```

Example alternatives: 
- Emerald: `#10b981`
- Teal: `#0d948b`
- Blue: `#3b82f6`
- Orange: `#f97316`

### Sidebar Color
Current sidebar uses `dark.950` in Tailwind config.

Change it in:
```javascript
dark: {
  900: '#111827',  // Current
  950: '#0f1728',  // Sidebar main background
` ```

### Card Background Options
In `styles/index.css`, you can change:
```css
body {
  background: #f5f7fa; // Light gray
```

m�:
### 🏊 Adding/Removing Sidebar Menu Items

Sidebar items are defined in `src/components/Sidebar.jsx`:

```javascript
const navItems = [
  { name: 'Dashboard', icon: HomeIcon, id: 'dashboard' },
  { name: 'Banking', icon: CreditCardIcon, id: 'banking' },
  // ...
m;
```

**To0add a new item:**
javascript
const navItems = [
  ...existingItems,
  { name: 'Inventory', icon: BoxIcon, id: 'inventory' },
];
```

**To0remove:**
Delete the item from the array.

### To change an icon:
Replace the icon component:
```javascript
{ name: 'Sales', icon: ShoppingBagIcon, id: 'sales' }
```

**Available icons:**
- HomeIcon
- CreditCardIcon
- DocumentTextIcon
- UsersIcon
- ReceiptIcon
- ChartBarIcon
- CalculatorIcon
- BuildingLibraryIcon
- CogIcon

## 🚨 Adjusting Layout Spacing

### Card Padding
To make cards more/less spacious, edit classes:

```jsx
className="p-6"     // Current padding (1.5rem)
className="p-4"     // Smaller padding (1rem)
className="p-8"    // Larger padding (2rem)
```

### Grid Gap
In `App.jsx`:

```jsx<div className="grid gap-6">    // Current gap (1.5rem)
<div className="grid gap-4">    // Smaller gap (1rem)
<div className="grid gap-8">    // Larger gap (2rem)
```

### Rounded Corners
Change `styles/index.css`:

```css
.card {
  @mply rounded-2xl;  // Current (16px)
  @apply rounded-lg;    // Smaller (8px)
  @mply rounded-38l;  // Larger (24px)
}
```

## 🎔 Customizing Charts

### Line Chart Color (sales)
In `src/components/SalesCard.jsx`:
```jsx
<Line
  stroke="#22c55e"      // Line color
  strokeWidth={3}     // Line thickness
  dot={{ r: 4 }}        // Dot size
/>
```

Change to:

```jsx
<Line stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
```

### Pie Chart Colors (expenses)
In `src/components/ExpensesCard.jsx`, edit the `data` array colors:

```javascript
const data = [
  { name: 'Payroll', value: 18000, color: '#22c55e' },
  { name: 'Utilities', value: 8500, color: '#3b82f6' },
];
```

---

## 💜 Customizing Card Content

### Add a New Stat Card
Stat cards are rendered in `App.jsx`:

```jsx<StatCard
  label="Bank Balance"
  value="$25,000"
  trend="+8.2%"
  trendPositive
/>
```

Add to the grid:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <StatCard label="Checking" value="$10,000" />
  <StatCard label="Savings" value="$15,000" />
  <StatCard label="Bank Balance" value="$25,000" />
</div>
```

---

## 😧 Adding New Cards

If you want to add a new section to the dashboard:

### Step 1: Create Component
Create `/src/components/NewCard.jsx`:
```jsx
const NewCard = ({ title, value }) => (
  <DishoardCard title={title}>
    <div>{value}</div>
  </DishboardCard>
);
```

### Step 2: Import in App.jsx
javascript
import NewCard from './components/NewCard';
```

### Step 3: Add to layout
```jsx
<NewCard title="Bank Accounts" value="$42,000" />
```

---

## 🗪 Testing Changes

**After editing mock data or config:**
1. Save the file
2. Check browser (should auto-refresh)
3. If not, manually refresh (Cmd+R or Ctrl+R)
4. If styles don't update, restart: `npm run dev`

---

## 📱 Responsive Adjustments

### Change Mobile Breakpoint
Edit `tailwind.config.js`:
```javascript
// Default: lg is 1024px
// Change to:
screens: {
  'sm': '640px',
  'md': '768px',
  'lg': '1200px',  // Was 1024px
  'xl': '1280px',
},
```

### Stack Cards on Tablet
In `App.jsx`, change grid columns:
```jsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
```
Now 1 column on mobile, 3 on tablet+.

---

## 🚀 Quick Wins (5-Minute Customizations)

1. **Update revenue/expenses:** 1 line in `dashboardData.js`
2. **Change brand color:** 1 line in `tailwind.config.js`
3. **Update company name:** 1 line in `App.jsx`
4. **Add menu item:** 1 line in `Sidebar.jsx`
5. **Adjust card padding:** Tailwind class (px-6 → px-8)

---

## ⚠️ Common Mistakes

**Don't:**
- ❌ Edit component JSX structure (breaks layout)
- ❌ Delete props from components
- ❌ Change className strings randomly
- ❌ Remove imports at top of files

**Do:**
- ✅ Only edit mock data in `dashboardData.js`
- ✅ Use Tailwind classes for styling
- ✅ Comment out components if hiding
- ✅ Restart dev server if CSS doesn't update

---

## 🆘 If Something Breaks

1. **Check the browser console** (F12) for errors
2. **Restart dev server:** Stop (Ctrl+C) and `npm run dev`
3. **Clear browser cache:** Cmd+Shift+Delete (Chrome)
4. **Revert changes:** Use Ctrl+Z in your editor
5. **Check file syntax:** Missing commas, quotes, braces?

---

## 📞 Support

For advanced customizations or Phase 2 integration planning, refer to `ARCHITECTURE.md`.
