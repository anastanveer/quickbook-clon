# QuickBooks Dashboard - Architecture Documentation

## System Overview

This is a **frontend-only, component-based React application** designed with a scalable architecture that's ready for backend integration in Phase 2.

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │           App.jsx (Main Layout & Grid)               │  │
│  │  ┌────────────┬──────────────┬────────────────────┐  │
│  │  │  Sidebar   │   Header     │   Main Content     │  │
│  │  │            │             │   (Dashboard)     │  │
│  │  └────────────┴──────────────┴────────────────────┘  │
│  └───────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌───────────────────────────────────────────────────────┐  │
│  │                  DASHBOARD CARDS                     │  │
│  │  ┌─────────────────────────────────────────────────┐ │  │
│  │  │ StatCard │ ProfitLoss │ Sales │ Expenses │...  │ │  │
│  │  └─────────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘
                            ↓
┌────────────────────────────────────────────────────────────┐
│                    DATA LAYER (Mock)                        │
│                  dashboardData.js                           │
│  (In Phase 2, replace with API calls via React Query)      │
└─────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

### Layout Components
```
App
├── Sidebar
│   └── Menu Items (hardcoded)
├── Header
│   ├── Company Name
│   ├── Search Input
│   ├── Notifications Icon
│   └── User Profile Dropdown
└── Main Content Area
    ├── Dashboard Title Section
    ├── Quick Stats Row
    │   ├── StatCard (Revenue)
    │   ├── StatCard (Expenses)
    │   ├── StatCard (Profit)
    │   └── StatCard (Due Amount)
    ├── Main Grid (3-column on desktop, responsive)
    │   ├── Left Column (2/3 width)
    │   │   ├── ProfitLossCard
    │   │   └── SalesCard
    │   └── Right Column (1/3 width)
    │       ├── ExpensesCard
    │       └── InvoicesCard
    └── Full-width Bottom
        └── CapitalCard
```

## Component Breakdown

### 1. **Sidebar.jsx**
- **Purpose:** Left navigation menu
- **Props:** `active` (string), `onMenuChange` (function)
- **Features:**
  - 9 menu items (Dashboard, Banking, Invoicing, etc.)
  - Active state highlighting
  - Emoji icons for quick visual scanning
  - Fixed position, 256px wide
- **Styling:** Border-right, soft shadows, brand color

### 2. **Header.jsx**
- **Purpose:** Top bar with company info, search, notifications
- **Props:** `companyName` (string)
- **Features:**
  - Company name + "Business Overview" subtitle
  - Search input with icon
  - Notifications bell with red dot
  - User profile dropdown (expandable)
- **Styling:** Border-bottom, white background, shadows

### 3. **DashboardCard.jsx** (Base Wrapper)
- **Purpose:** Reusable card container for all dashboard sections
- **Props:** `title`, `children`, `icon`, `showIcon`
- **Features:**
  - Rounded corners (XL)
  - Soft shadows with hover effect
  - Icon display in top-right
  - Clean typography for title
- **Used By:** ProfitLossCard, ExpensesCard, SalesCard, InvoicesCard, CapitalCard

### 4. **StatCard.jsx**
- **Purpose:** Small metric cards (top row)
- **Props:** `label`, `value`, `icon`, `trend`, `trendDirection`, `color`
- **Features:**
  - Colored background badge
  - Trend indicator (up/down arrow + percentage)
  - Flexible color scheme (primary, blue, amber, purple, pink)
  - Compact, scannable format
- **Colors:** Uses semantic color mapping

### 5. **ProgressBar.jsx**
- **Purpose:** Reusable horizontal progress/percentage visualization
- **Props:** `label`, `value`, `max`, `color`, `showValue`, `formatValue`
- **Features:**
  - Smooth animated bar
  - Optional value display
  - Custom formatting (currency, percentage, etc.)
  - Color customization
- **Used By:** ProfitLossCard, InvoicesCard

### 6. **ProfitLossCard.jsx**
- **Purpose:** Financial overview (revenue, expenses, profit)
- **Data Props:** `revenue`, `expenses`, `profit`
- **Features:**
  - Large profit amount display (primary color)
  - Two progress bars (revenue vs expenses)
  - Calculated metrics (profit margin, expense ratio)
  - Summary grid at bottom
- **Calculations:**
  - Profit Margin = (Profit / Revenue) × 100
  - Expense Ratio = (Expenses / Revenue) × 100

### 7. **ExpensesCard.jsx**
- **Purpose:** Expense breakdown visualization
- **Data Props:** `categories` (array of {name, value, color})
- **Features:**
  - Recharts PieChart (donut style)
  - Legend with percentages
  - Interactive tooltips
  - Total expenses summary
- **Chart:** 60px inner radius, 90px outer radius, 2px padding

### 8. **SalesCard.jsx**
- **Purpose:** 30-day sales trend visualization
- **Data Props:** `data` (array of {date, amount})
- **Features:**
  - Recharts LineChart with smooth curves
  - Grid background with dashed lines
  - Key stats (total, average, peak)
  - Interactive tooltips & legends
  - Responsive height (288px)
- **Formatting:** Currency in K format ($125K)

### 9. **InvoicesCard.jsx**
- **Purpose:** Invoice status overview + recent list
- **Data Props:** `unpaidAmount`, `overdueAmount`, `paidAmount`, `invoices`
- **Features:**
  - Two progress bars (collected vs outstanding)
  - 3-column status badges (paid/unpaid/overdue)
  - Recent invoices list (last 3)
  - Status-based color coding
  - "View All" action button
- **Colors:** Green (paid), Amber (unpaid), Red (overdue)

### 10. **CapitalCard.jsx**
- **Purpose:** Growth roadmap tracker
- **Data Props:** `steps` (array of {id, title, description, done})
- **Features:**
  - Progress bar showing completion %
  - Checkable steps with icons
  - Done/Pending visual states
  - Call-to-action button
- **Styling:** Circular checkboxes, color transition on completion

## Data Flow

### Current (Phase 1): Static Mock Data
```
dashboardData.js (hardcoded values)
         ↓
    App.jsx imports
         ↓
  Components consumed as props
         ↓
        Browser renders
```

### Future (Phase 2): API Integration Pattern
```
API Layer (REST/GraphQL)
         ↓
React Query / SWR (caching)
         ↓
  State Management (Context/Redux optional)
         ↓
    App.jsx (useQuery hooks)
         ↓
  Components (same props, live data)
         ↓
        Browser renders
```

### No Breaking Changes Needed
Components are **prop-agnostic** — they don't care if data comes from mock objects or API calls. Just replace the data source in App.jsx.

## Styling Architecture

### Tailwind CSS Strategy
- **Color Scale:** Extended neutral + primary in tailwind.config.js
- **Spacing:** 8px grid system (4, 8, 12, 16, 24, 32, etc.)
- **Shadows:** Customized shadow scale (soft → strong)
- **Rounded Corners:** sm, md, lg, xl, 2xl

### Component Layer (Global Classes)
```css
@layer components {
  .sidebar-link { /* reusable sidebar links */ }
  .sidebar-link.active { /* active state */ }
  .dashboard-card { /* reusable card base */ }
  .stat-badge { /* reusable badge */ }
}
```

### Responsive Breakpoints (Tailwind defaults)
- **sm:** 640px (tablets)
- **md:** 768px (small tablets/laptops)
- **lg:** 1024px (laptops, main breakpoint)
- **xl:** 1280px (large screens)

### Layout Grid System
```jsx
// Quick Stats - 4 columns on lg, 2 on md, 1 on sm
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4

// Main Dashboard - 3 columns with sidebar
lg:col-span-2 (left) + 1 (right)

// Sidebar - fixed 256px (w-64)
Main flex area - flex-1 to fill remaining space
```

## State Management

### Current (Phase 1)
- **Minimal State:** Only `activeMenu` in App.jsx for sidebar
- **Component State:** Dropdown menus have local `useState`
- **No Redux/Context:** Not needed for static dashboard

### Ready for Phase 2
```javascript
// Future pattern (add these dependencies when needed)
// npm install react-query axios

import { useQuery } from 'react-query';
import axios from 'axios';

const { data, isLoading, error } = useQuery('dashboardData', async () => {
  const res = await axios.get('/api/dashboard');
  return res.data;
});
```

## Performance Considerations

### Current Optimizations
- ✅ Memoization not needed yet (small, static component tree)
- ✅ No unnecessary re-renders (proper prop drilling)
- ✅ CSS-in-JS via Tailwind (pre-compiled)
- ✅ Lazy charts rendering (Recharts optimized)

### Phase 2 Recommendations
- Add `React.memo()` for expensive chart components
- Implement `useCallback` for event handlers
- Use React Query for API call caching
- Consider code-splitting for different dashboard tabs

## Extension Points

### Adding a New Dashboard Section

1. **Create Component** (`src/components/NewSection.jsx`):
```jsx
import DashboardCard from './DashboardCard';

export default function NewSection({ data }) {
  return (
    <DashboardCard title="New Section" icon="🎯">
      {/* Content */}
    </DashboardCard>
  );
}
```

2. **Add Mock Data** (`src/data/dashboardData.js`):
```javascript
export const dashboardData = {
  // ... existing data
  newSectionData: { /* ... */ },
};
```

3. **Integrate in App** (`src/App.jsx`):
```jsx
import NewSection from './components/NewSection';

// In JSX:
<NewSection data={dashboardData.newSectionData} />
```

### Changing Color Scheme

Edit `tailwind.config.js`:
```javascript
primary: {
  50: '#f0f7ff',   // light
  600: '#0066cc',  // brand color (currently #22c55e green)
  700: '#004399',  // darker
  // ...
}
```

### Adding a New Chart Type

1. Install: `npm install chart-type-library`
2. Create: `src/components/NewChartCard.jsx`
3. Import chart: `import { ChartComponent } from 'library'`
4. Wrap with `DashboardCard`
5. Pass data from `dashboardData.js`

## Scalability Notes

### Component Reuse Rating
- **High:** DashboardCard, ProgressBar, StatCard (used 4+ times)
- **Medium:** Chart cards (ExpensesCard, SalesCard)
- **Single-use:** Sidebar, Header, CapitalCard

### Would Benefit from Refactoring (Phase 2+)
- Extract common chart styling into `ChartCardWrapper`
- Create `FormattedNumber` component for currency/percentage
- Extract `useDashboardData` custom hook when API integration happens

## Testing Strategy (Not Implemented Yet)

```javascript
// Example: jest + React Testing Library (Phase 2)

describe('StatCard', () => {
  it('renders label and value', () => {
    render(<StatCard label="Revenue" value="$1,000" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
  });
});
```

## Deployment Checklist

```
□ Run: npm run build
□ Check: dist/ folder created
□ Test prod build: npm run preview
□ Optimize images (none yet)
□ Minify CSS/JS (Vite does this)
□ Set up CDN for assets
□ Configure environment variables (for Phase 2 API)
□ Add CSP headers
□ Deploy to Vercel/Netlify/AWS
```

## Documentation Standards

- **Component files:** Include JSDoc comments for props
- **Data file:** Clear comments for mock values
- **Styled elements:** Reference Tailwind class intent
- **Complex logic:** Explain calculations (profit margin, etc.)

---

**This architecture is designed for clarity, maintainability, and smooth handoff to Phase 2 backend development.**
