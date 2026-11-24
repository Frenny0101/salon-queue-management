# AGENTS.md — Salon Queue Management

Build a salon queue app where customers join from their phone, see their wait, and get called. Reception and barbers manage the queue; a TV shows current and upcoming tokens.

## Read first
- docs/01-brief.md — purpose, users, must-have features and exclusions
- docs/02-screens.md — all seven screens and UI behaviour
- docs/03-flows-rules.md — queue rules and test checklist

## Stack
React + Vite. Styling is in `src/styles.css`. Run with `npm run dev`; build with `npm run build`.

## Working rules
- Theme: charcoal `#1F2937` + gold `#D4A017`; clean, rounded, mobile-first.
- Keep queue rules and state updates in one shared application state.
- Use browser localStorage and the storage event for same-origin tabs. This is a local demo, not multi-device cloud sync.
- Keep labels in English; language field is reserved for EN/GU expansion.
- Never add online payments, future-date appointments, SMS/WhatsApp, loyalty or multiple branches.
- After each change, list changed files and how to test.
