# ServerTable Component Documentation

## Overview

The ServerTable component is a highly optimized React TypeScript component designed for monitoring server status with advanced sorting, filtering, and responsive layout features.

## Features

### ✅ Sorting Functionality
- **Numerical columns**: Health, CPU Usage, Memory Usage (sortable)
- **Text columns**: Instance Name, Status, Uptime (non-sortable as per requirements)
- **Three-state sorting**: None → Ascending → Descending → None

### ✅ Fixed Column Layout
- **Sticky first column**: Instance name remains visible during horizontal scroll
- **Horizontal scrolling**: Other columns scroll horizontally for better mobile experience
- **Responsive design**: Adapts to different screen sizes

### ✅ Modern Icons
- **Lucide React icons**: ChevronUp, ChevronDown, ChevronsUpDown, Search
- **Consistent design**: Modern and accessible icon library

### ✅ Advanced Features
- **Search functionality**: Filter by instance name or location
- **Visual indicators**: Progress bars with color coding for resource usage
- **Status badges**: Color-coded health and status indicators
- **Performance optimized**: Uses React.useMemo for efficient re-rendering

## Usage

### Basic Usage

```tsx
import ServerTable from '@/components/server-table'

function App() {
  return <ServerTable />
}
```

### With Custom Data

```tsx
import ServerTable from '@/components/server-table'

const serverData = [
  {
    id: "1",
    instance: "web-server-01",
    health: 98,
    cpuUsage: 45,
    memoryUsage: 67,
    status: "healthy",
    location: "US-East-1",
    uptime: "15天 4小时"
  },
  // ... more servers
]

function App() {
  return <ServerTable data={serverData} />
}
```

## Data Interface

```typescript
interface ServerData {
  id: string
  instance: string
  health: number          // 0-100 (sortable)
  cpuUsage: number       // 0-100 (sortable)
  memoryUsage: number    // 0-100 (sortable)
  status: "healthy" | "warning" | "critical"  // (non-sortable)
  location: string       // (non-sortable)
  uptime: string         // (non-sortable)
}
```

## Column Configuration

| Column | Label | Sortable | Type | Description |
|--------|-------|----------|------|-------------|
| instance | 实例名称 | ❌ | string | Server instance name (fixed column) |
| health | 健康值 | ✅ | number | Health percentage with color coding |
| cpuUsage | CPU使用率 | ✅ | number | CPU usage with progress bar |
| memoryUsage | 内存使用率 | ✅ | number | Memory usage with progress bar |
| status | 状态 | ❌ | enum | Status badge (healthy/warning/critical) |
| uptime | 运行时间 | ❌ | string | Server uptime display |

## Color Coding

### Health Status
- **Green (90-100%)**: Healthy status
- **Yellow (70-89%)**: Warning status  
- **Red (0-69%)**: Critical status

### Resource Usage
- **Green (0-59%)**: Normal usage
- **Yellow (60-79%)**: Medium usage
- **Red (80-100%)**: High usage

## Responsive Design

- **Desktop**: Full table with all columns visible
- **Tablet**: Horizontal scroll with fixed first column
- **Mobile**: Compact layout with fixed instance column

## Dependencies

```json
{
  "react": "^17.0.0 || ^18.0.0",
  "lucide-react": "^0.400.0+",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

## File Structure

```
src/
├── components/
│   ├── server-table.tsx      # Main component
│   ├── server-table-demo.tsx # Demo component
│   └── ui/
│       ├── table.tsx         # Table UI components
│       └── input.tsx         # Input UI component
├── lib/
│   └── utils.ts              # Utility functions
└── styles/
    └── globals.css           # Global styles
```

## Performance Considerations

- **useMemo**: Efficient filtering and sorting
- **Minimal re-renders**: Optimized state management
- **Sticky positioning**: CSS-based fixed columns
- **Responsive breakpoints**: Tailwind CSS utilities

## Accessibility

- **Keyboard navigation**: Tab through sortable columns
- **Screen reader support**: Proper ARIA labels
- **Color contrast**: WCAG compliant color schemes
- **Focus indicators**: Clear visual focus states

## Browser Support

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Demo

A standalone HTML demo is available at `server-table-improved.html` which showcases all features without requiring a build process.