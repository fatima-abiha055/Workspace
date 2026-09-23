npm# WorkSpace – Coworking Space Booking System

A frontend-only React app (Vite + React Router) for browsing, filtering and booking
coworking desks, private offices and meeting rooms. No backend — all data (bookings,
favorites, profile, login state) persists in your browser's localStorage.

## Run it locally

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Tech stack
HTML5, CSS3, JavaScript, React.js, React Router, localStorage. No Node/Express/DB/backend.

## Structure
- `src/components` — reusable UI pieces (Navbar, cards, modal, toast, filters...)
- `src/pages` — one file per route (Home, Workspaces, WorkspaceDetails, Bookings, Dashboard...)
- `src/data` — demo workspace & meeting room data
- `src/utils` — price calculator and localStorage helpers (bookings, favorites, auth)

## Demo login
Login/signup is frontend-only — enter any name/email/password to create a session.
