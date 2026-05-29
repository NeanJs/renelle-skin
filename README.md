# 🧴 Renelle Skin

> A premium clinical-neutral e-commerce & subscription skincare platform featuring a state-of-the-art SaaS admin panel inspired by Linear and Stripe.

[![React](https://img.shields.io/badge/React-18.3-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-purple?style=flat-square&logo=vite)](https://vite.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red?style=flat-square)](#)

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
  - [Public Storefront](#public-storefront)
  - [SaaS Admin Panel](#saas-admin-panel)
- [Tech Stack](#-tech-stack)
- [Architecture & Directory Structure](#-architecture--directory-structure)
- [Local Setup & Getting Started](#-local-setup--getting-started)
- [SaaS Admin Interface Details](#-saas-admin-interface-details)
- [Dynamic Brand System](#-dynamic-brand-system)
- [Production Build](#-production-build)

---

## 🎯 Overview

**Renelle Skin** is a premium web application designed for clinical skincare e-commerce and subscription plans. The system is split into two primary areas:
1. **Public Storefront**: An engaging, high-end, responsive portal where customers can browse clinical skincare kits, select customized subscription tiers, and complete orders with a seamless checkout.
2. **SaaS Admin Dashboard** (`/admin`): A professional workspace inspired by Stripe and Linear, featuring comprehensive product tiering, order queue tracking, POS synchronization retry systems, live brand customization previewers, and real-time toast interactions.

---

## ✨ Key Features

### Public Storefront
- **Responsive Landing Page**: Clean, modern aesthetics, clinical color schemes, and seamless micro-animations.
- **Subscription Kits Pages**: Informative custom details pages showcasing kit compositions and clinical benefit parameters.
- **Flexible Subscription Workflows**: Easily navigate subscription options, tier details, and checkouts.
- **Dynamic Local Checkout**: A responsive multi-step checkout workflow with dynamic pricing based on customer selections.

### SaaS Admin Panel
- **Dashboard Overview**: Financial KPIs (MRR, LTV), active subscription metrics, active system status indicators (POS, Stripe, Analytics), and recent order activity logs.
- **Products & Tier Manager**: Dynamic product listings where administrators can edit tier structures, configure special subscription discounts, and toggle badges (e.g., "Most Popular").
- **Orders & POS Console**: Tracking orders with deep drawer views detailing customer info, shipping addresses, POS sync retry hooks, and shipping label regenerations.
- **Subscription Lifecycle Console**: Metrics detailing MRR, average subscription values, and controls to upgrade, downgrade, pause, or cancel subscriptions on a client-by-client basis.
- **Global Settings & Live Customizer**: Dynamic customization dashboard allowing real-time edits to the primary and accent theme colors, commerce tax/shipping rules, and secure integration API endpoints.

---

## 💻 Tech Stack

- **Core Framework**: React 18 & TypeScript
- **Bundler & Tooling**: Vite 6
- **Styling**: Tailwind CSS v4 (with modern clinical typography and glassmorphic designs)
- **Navigation**: React Router DOM v7
- **UI Components**: Radix UI (Primitives for high-accessibility accordions, dialogs, dropdowns, and sheets)
- **Data Visualizations**: Recharts (for clean dashboard financial metrics)
- **Icons**: Lucide Icons
- **Notifications**: Sonner (for beautiful micro-toasts)

---

## 📁 Architecture & Directory Structure

```text
/src/
├── app/
│   ├── api/                      # Client API abstractions (Products, customers)
│   ├── components/
│   │   ├── admin/                # Specialized reusable Admin Dashboard blocks
│   │   │   ├── AdminHeader.tsx   # Integrated top bar
│   │   │   ├── AdminLayout.tsx   # Sidebar + page container wrapper
│   │   │   ├── AdminSidebar.tsx  # Dynamic sidebar with collapse modes
│   │   │   ├── DataTable.tsx     # Generic sorting/paginated tables
│   │   │   └── EmptyState.tsx    # Unified empty states
│   │   ├── figma/                # UI fallback utility elements
│   │   └── ui/                   # Modular Radix UI primitive templates
│   ├── config/
│   │   └── brand.ts              # Global brand variables and type definitions
│   ├── data/                     # Subscriptions data and kit details
│   ├── pages/
│   │   ├── admin/                # SaaS Admin Dashboard pages
│   │   │   ├── CustomersManagement.tsx
│   │   │   ├── DashboardOverview.tsx
│   │   │   ├── OrdersManagement.tsx
│   │   │   ├── ProductsManagement.tsx
│   │   │   ├── SettingsPage.tsx
│   │   │   └── SubscriptionsManagement.tsx
│   │   └── (storefront)/         # Public e-commerce page views
│   └── App.tsx                   # Main Routing and Layout bootstrap
├── styles/
│   ├── fonts.css                 # Premium typography setups
│   ├── theme.css                 # Dynamic global design tokens
│   └── tailwind.css              # Tailwind configuration layers
└── main.tsx                      # Vite Application Mountpoint
```

---

## 🚀 Local Setup & Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites
Make sure you have Node.js (version 18 or above) and npm installed.

### 1. Clone & Navigate
```bash
git clone <your-repository-url>
cd renelle-skin
```

### 2. Configure Environment Variables
Create a local `.env` file in the root directory (this is automatically ignored by Git):
```text
VITE_WC_URL=http://gjr.aml.mybluehost.me/website_a384c47f/wp-json/wc/store/v1
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Start Local Development Server
```bash
npm run dev
```
The application will start, and you can view it at: **`http://localhost:5173`** (or your local Vite network port).

---

## 🛠️ SaaS Admin Interface Details

To access the administrative operations dashboard, navigate to:
```text
http://localhost:5173/admin
```
The admin layout features nested routing under `/admin` with:
- **Products Console**: Fully operational modals to edit inventory parameters.
- **Checkout Orders Console**: Expandable side sheets with quick-action POS retry integrations.
- **MRR Subscriptions Panel**: Confirmation dialogs for subscription modifications.
- **Brand Setting Customizer**: Fully real-time brand previews that persist directly to local configuration states.

---

## 🎨 Dynamic Brand System

The system implements a global configuration design:
1. **Dynamic Customizer**: Located under `/admin/settings`, the customizer supports real-time brand color updates.
2. **State Syncing**: Colors are stored persistently via `localStorage` in the `BrandConfig` context.
3. **Application System**: Values from `src/app/config/brand.ts` apply system-wide across both storefront and backend operations dynamically.

---

## 📦 Production Build

To compile the application into a optimized production build bundle:
```bash
npm run build
```
This generates static files inside the `dist/` directory, optimized and ready for production hosting (such as Netlify, Vercel, or AWS S3).
