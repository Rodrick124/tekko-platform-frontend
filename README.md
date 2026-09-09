# Tekko Platform Frontend

Tekko is a Cameroon-focused service marketplace frontend that helps clients find qualified local providers, review their services, and unlock provider contact details. The product experience is designed around quick discovery, verified providers, and simple client access through MTN Mobile Money or Orange Money.

This repository contains the frontend application for the Tekko platform. It currently uses local mock data and browser storage so the main workflows can be tested before a production API is connected.

## Product Areas

- Public provider discovery with category, city, and service filters
- Provider profiles and contact-unlock payment flows
- Client dashboard, profile, settings, access history, and payment history
- Client registration, login, password recovery screens, and protected routes
- Admin dashboard, provider management, categories, transactions, unlocks, analytics, and audit logs
- Responsive layouts for public, client, and admin experiences

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- Axios
- Recharts
- Lucide React
- React Hot Toast

## Getting Started

### Requirements

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

### Other commands

```bash
npm run lint    # Run ESLint
npm run build   # Create a production build
npm run preview # Preview the production build locally
```

## Important Routes

| Area | Route |
| --- | --- |
| Home | `/` |
| Providers | `/prestataires` |
| How it works | `/comment-ca-marche` |
| About | `/a-propos` |
| Login | `/connexion` |
| Registration | `/inscription` |
| Client dashboard | `/client` |
| Client payments | `/client/paiements` |
| Admin login | `/admin/connexion` |
| Admin dashboard | `/admin` |

## Demo Authentication

Authentication is currently local and intended for development and QA only. Passwords are not suitable for production use and must be replaced by server-side authentication before release.

### Seeded tester accounts

| Name | Email | Phone | Password |
| --- | --- | --- | --- |
| Amina Testeur | `amina.testeur@example.cm` | `690123456` | `TekkoDemo123` |
| Michel QA | `michel.qa@example.cm` | `677987654` | `TekkoDemo456` |

Open `/connexion` to test login. Open `/inscription` to create another mock client account. New accounts are appended to the browser's `localStorage` mock collection and remain available after reload or logout.

To reset browser-created accounts, clear these localStorage keys in the browser for the current origin:

- `tekko.demo.users`
- `tekko.demo.session`

Seeded accounts are defined in [`src/data/mockUsers.js`](src/data/mockUsers.js). The local persistence adapter is [`src/services/authService.js`](src/services/authService.js).

## Project Structure

```text
src/
	components/     Shared UI and layout components
	constants/      Route and application constants
	context/        React context providers
	data/           Mock providers, categories, users, and statistics
	features/       Feature-specific components and pages
	hooks/          Reusable React hooks
	pages/          Public top-level pages
	routes/         Router and protected-route definitions
	services/       API and local demo service modules
	utils/          Formatting and utility functions
```

## Current Limitations

- There is no production backend integration yet.
- Mock accounts and sessions are stored in browser localStorage.
- Payment and contact-unlock flows are demonstrations only.
- Demo passwords are stored locally and must not be used as a security model.
- The application is currently configured as a frontend-only Vite project.

## Development Notes

Keep feature-specific UI and behavior inside `src/features`, shared primitives inside `src/components`, and data access behind service modules. When the backend is introduced, replace the local implementations in `src/services` while keeping the page and context APIs stable where possible.

The auth flow currently uses demo data. Open `/connexion` with one of these accounts:

| Name | Email | Phone | Password |
| --- | --- | --- | --- |
| Amina Testeur | `amina.testeur@example.cm` | `690123456` | `TekkoDemo123` |
| Michel QA | `michel.qa@example.cm` | `677987654` | `TekkoDemo456` |

Accounts created through `/inscription` are appended to the browser's `localStorage` mock user collection, so they remain available after reload. They do not modify the source mock file. Clear the `tekko.demo.users` and `tekko.demo.session` localStorage keys to reset browser-created accounts.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
