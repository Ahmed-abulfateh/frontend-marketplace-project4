# frontend-marketplace-project4

React + Vite marketplace frontend with buyer, seller, and admin workflows.

The app is designed to run in two modes:

- Remote API mode (default): connects to a backend at `VITE_API_URL` (defaults to `http://localhost:3000`).
- Local demo fallback mode: if the backend is unreachable, it automatically falls back to in-browser demo data so the UI remains usable.

## Tech Stack

- React 19
- React Router 7
- Axios
- Vite 8
- ESLint

## Core Features

- Marketplace browsing and product detail pages
- Authentication (sign in, sign up, reset password flow)
- Buyer flows: cart, checkout, shipments, profile
- Seller workspace: products, orders, order detail
- Admin workspace: moderation, sellers, consumers
- Deployment status page at `/deployment`
- Language switcher

## Routes

Public:

- `/`
- `/browse`
- `/browse/:listingId`
- `/sign-in`
- `/sign-up`
- `/reset-password`
- `/deployment`

Authenticated (buyer, seller, admin):

- `/profile`
- `/checkout`
- `/checkout/:listingId`
- `/checkout/success`
- `/shipments`

Seller only:

- `/seller`
- `/seller/products`
- `/seller/orders`
- `/seller/orders/:orderId`

Admin only:

- `/admin`
- `/admin/consumers`
- `/admin/moderation`
- `/admin/moderation/:listingId`
- `/admin/sellers`

## Demo Accounts (Local Fallback Mode)

When running without a backend, sign in using these seeded accounts:

- Admin: `ahmed-bh91@live.com` or `66929266`
- Seller: `ahmed-bh91@hotmail.com` or `66663101`
- Buyer: `mohd-bh91@hotmail.com` or `17681877`

Shared demo password:

- `@khalid123Qwe`

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Configure Environment

Create `.env` from `.env.example`:

```bash
cp .env.example .env
```

Default env:

```env
VITE_API_URL=http://localhost:3000
```

### Run Development Server

```bash
npm run dev
```

### Build Production Bundle

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Backend Integration

This frontend expects a compatible backend API (typically the sibling project at `../backend-project4`) exposing endpoints under `/api`.

Typical local API base:

- `http://localhost:3000`

The frontend calls endpoints such as:

- `GET /api/bootstrap`
- `POST /api/auth/sign-in`
- `POST /api/auth/sign-up`
- `PATCH /api/profile`
- `POST /api/checkout`
- `GET /api/health`

If the backend is unavailable, this frontend automatically switches to local demo mode.

## Runtime Behavior

- Startup attempts remote API first.
- Network-unreachable errors trigger automatic fallback to local demo adapter.
- In demo mode, auth and marketplace data are stored in browser local storage.

## Troubleshooting

### "Could not reach the marketplace server"

- Ensure backend is running on the URL in `VITE_API_URL`.
- If backend is down, refresh and continue in demo mode.

### Backend starts but API still fails

- Check backend CORS allows your frontend origin (`http://localhost:5173` or `http://127.0.0.1:5173`).
- Confirm backend database connectivity.

### Port already in use

- Vite may switch ports automatically (for example from `5173` to `5174`).

## Project Structure

```text
src/
	components/
	content/
	context/
	lib/
	pages/
	App.jsx
	main.jsx
```

## Security Notes

- Do not commit real secrets in `.env` files.
- Rotate credentials if they were ever exposed.
- Use dedicated app passwords for SMTP providers where required.

## License

This project is for coursework/lab usage unless you add your own license.