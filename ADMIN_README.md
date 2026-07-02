# Dermera Labs Admin Panel

## Overview

The admin panel is a complete dashboard system for managing Dermera Labs' e-commerce operations. Built with React, TypeScript, and Tailwind CSS, it follows a clean SaaS dashboard design inspired by Stripe and Linear.

## Routes

All admin routes are under `/admin`:

- `/admin` - Dashboard Overview
- `/admin/products` - Product Management
- `/admin/orders` - Order Management
- `/admin/subscriptions` - Subscription Management
- `/admin/customers` - Customer Directory
- `/admin/settings` - System Settings

## Features

### Dashboard Overview
- Revenue metrics with trend indicators
- Active subscription count
- Order tracking
- Failed payment alerts
- POS integration status
- System health monitoring
- Recent activity feed

### Products Management
- Create, edit, and delete products
- Dynamic tier system (expandable beyond 4 tiers)
- Subscription discount configuration
- "Most Popular" badge management
- Active/inactive status toggle
- Real-time validation
- Toast notifications for all actions

### Orders Management
- Order listing with advanced filtering
- Payment status tracking
- POS sync status monitoring
- Shipping label generation
- Detailed order drawer with:
  - Customer information
  - Shipping address
  - Payment details
  - Order timeline
  - POS retry functionality

### Subscriptions Management
- Active subscription monitoring
- Tier upgrade/downgrade functionality
- Subscription cancellation with confirmation
- Monthly recurring revenue (MRR) tracking
- Renewal date management
- Customer retention metrics

### Customers Management
- Customer directory
- Lifetime value (LTV) tracking
- Order history
- Subscription status overview

### Settings
Three main sections:

#### Brand Settings
- Brand name (global variable)
- Logo upload
- Primary color customization
- Accent color customization
- Real-time preview

#### Commerce Settings
- Currency selection (CAD, USD, EUR, GBP)
- Tax rate configuration
- Shipping fee setup

#### Integration Settings
- POS API configuration
- Stripe payment gateway setup
- Webhook management

## Architecture

### Component Structure

```
/src/app/
├── components/
│   └── admin/
│       ├── AdminLayout.tsx       # Main layout wrapper
│       ├── AdminSidebar.tsx      # Navigation sidebar
│       ├── AdminHeader.tsx       # Top header with search
│       ├── StatCard.tsx          # Metric display cards
│       ├── DataTable.tsx         # Reusable table component
│       └── EmptyState.tsx        # Empty state component
├── pages/
│   └── admin/
│       ├── DashboardOverview.tsx
│       ├── ProductsManagement.tsx
│       ├── OrdersManagement.tsx
│       ├── SubscriptionsManagement.tsx
│       ├── CustomersManagement.tsx
│       └── SettingsPage.tsx
└── config/
    └── brand.ts                  # Global brand configuration
```

### Reusable Components

All admin components are built to be reusable:

- **DataTable**: Generic table with sorting, pagination support
- **StatCard**: Metric display with icons and trend indicators
- **AdminSidebar**: Collapsible navigation with active states
- **AdminHeader**: Unified header with search and notifications
- **EmptyState**: Standardized empty state messaging

### State Management

- Local state using React hooks
- Brand configuration stored in localStorage
- Toast notifications via Sonner
- Form state managed with controlled components

## Design System

The admin panel follows the existing Dermera Labs design system:

- **Colors**: Clinical neutral palette from `theme.css`
- **Typography**: Existing font hierarchy
- **Spacing**: Consistent with public site
- **Border Radius**: 12px-16px for premium feel
- **Transitions**: Smooth 200ms animations

### Differences from Public Site

- More structured layouts (tables, grids)
- Higher information density
- Focus on operational clarity
- Less marketing-oriented messaging

## Scalability

The admin panel is built to scale:

- Dynamic tier system (not hardcoded to 4)
- Dynamic product data binding
- Global brand variables throughout
- Modular component architecture
- No hardcoded product names
- Expandable settings structure

## Responsive Design

- **Desktop**: Full sidebar and multi-column layouts
- **Tablet**: Collapsible sidebar, single-column where needed
- **Mobile**: Hamburger menu, stacked layouts, touch-optimized

## Integration Points

### POS System
- Order synchronization
- Inventory tracking
- Label generation
- Retry mechanisms

### Payment Gateway (Stripe)
- Payment processing
- Webhook handling
- Failed payment tracking

### Future Expansion
The architecture supports adding:
- Analytics dashboard
- Email marketing tools
- Advanced reporting
- User role management
- Audit logs
- Bulk operations

## Development Notes

- All settings use the `BrandConfig` type
- Toast notifications for user feedback
- Loading states on all async operations
- Error handling with user-friendly messages
- Accessibility considerations (ARIA labels, keyboard navigation)

## Usage

To access the admin panel, navigate to `/admin` in your browser. The sidebar provides navigation to all sections.

All changes made in Settings are stored in localStorage and apply system-wide immediately (with a page reload for brand settings).
