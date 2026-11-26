# MobiStock: Smart Inventory Management System for Mobile Shops

A front-end inventory app built with React and Vite. There is no backend yet; all data is saved in the browser's localStorage.

## Getting started

Requirements: Node.js (LTS) from https://nodejs.org

```bash
npm install
npm run dev
```

Then open http://localhost:5173 (the terminal prints the exact address).

| Command | Purpose |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Pages and routes

| URL | Page | Access |
|---|---|---|
| `/` | Landing page | Public |
| `/login` | Log in | Public |
| `/signup` | Sign up | Public |
| `/app/dashboard` | Dashboard | Logged-in users only |
| `/app/products` | Products (CRUD) | Logged-in users only |

Visiting any `/app/*` URL while logged out redirects to `/login`. Create an account on `/signup` first. Twelve demo products are loaded on the first visit so the dashboard is not empty.

## Features

- Categories: Mobiles, Accessories, Tempered Glass, Spare Parts
- Product fields: name, brand, model, RAM/storage, color, IMEI (mobiles only, 15 digits), purchase price, sale price, quantity, category
- Add, edit and delete products, with a confirmation dialog before deleting
- Search by name, brand, model or IMEI; filter by category, brand and stock status
- Pagination (5 products per page)
- Stock status badges: In Stock, Low Stock (below 5), Out of Stock
- Low stock banner on the Products page with one-click filters
- Export the current list to CSV
- Dashboard: total products, total stock value, low stock items, out of stock items, top brands chart, recent activity, restocking list
- Form validation and toast notifications
- Currency in PKR; responsive on mobile, tablet and desktop

## Project structure

```
src/
  pages/        Landing, Login, Signup, Dashboard, Products, NotFound, AuthShell
  components/   AppLayout, Sidebar, Navbar, ProtectedRoute, ProductForm, ProductTable,
                Pagination, Modal, ConfirmModal, StockBadge, StatCard, BrandChart, Logo
  context/      AuthContext, ProductContext, ToastContext
  utils/        storage, constants, formatters, validators, seed, exportCsv
  styles/       global, landing, auth, layout, products, dashboard
```

## Deploying to Vercel

1. Push the project to a GitHub repository.
2. On https://vercel.com choose "Add New Project" and import the repository.
3. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.
4. `vercel.json` is already included, so refreshing a URL such as `/app/products` does not return a 404.

## Notes

- Passwords are stored as plain text in localStorage for this demo only. A production system needs a backend and password hashing.
- Data lives in one browser. A different browser or device starts with fresh demo data.
