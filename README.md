# Salon Queue Management System

**Live demo:** Not deployed yet — run locally using the steps below.

A React + Vite salon queue application based on the supplied Vibe Coding Lab handout. It includes customer joining, queue status, reception, barber, TV display and owner settings screens.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Install and run
1. Extract the ZIP file.
2. Open the `salon-queue-management` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:

```bash
npm install
npm run dev
```

5. Open the URL printed in the terminal, usually `http://localhost:5173`.

## Build
```bash
npm run build
npm run preview
```

## Demo routes
- `/` — Overview
- `/join` — Customer Join Queue
- `/status` — Find status using phone number
- `/reception` — Reception dashboard
- `/barber` — Barber view
- `/display` — Waiting-area TV
- `/admin` — Owner settings

## Demo data
The app starts with sample customers, services and barbers. Use Owner Settings → Reset demo data to restore the sample state.

## Storage note
This starter uses browser `localStorage` and the browser `storage` event. It synchronizes tabs/windows on the same browser origin, but it does **not** synchronize different devices or browsers. For a real salon deployment, add a hosted database/realtime backend and staff authentication.

## Deploy
Build with `npm run build`; deploy the `dist` directory to Vercel or another static host. A live public URL requires deploying the project to a hosting account.
