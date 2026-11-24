# Salon Queue Management System

A responsive web application for managing salon queues and improving the waiting experience for customers and staff.

The system allows customers to join a queue, receive a token, and check their status. Reception staff can manage walk-in customers, while barbers can view and update their assigned services. The application also includes a waiting-area display and owner settings.

## Live Deployment

- **Live website:** [Open Salon Queue Management](https://20261208itpvibecoding.vercel.app/)
- **GitHub repository:** [Frenny0101/salon-queue-management](https://github.com/Frenny0101/salon-queue-management)

> If your Vercel deployment URL changes, update the live website link above.

---

## 📌 Table of Contents

- [Problem Statement](#-problem-statement)
- [Project Objectives](#-project-objectives)
- [System Overview](#-system-overview)
- [Technology Stack](#-technology-stack)
- [User Roles and Screen Specifications](#-user-roles-and-screen-specifications)
- [Main Features](#-main-features)
- [Queue Workflow and Business Rules](#-queue-workflow-and-business-rules)
- [Application Data Structure](#-application-data-structure)
- [Design System and UI Theme](#-design-system-and-ui-theme)
- [Project Folder Structure](#-project-folder-structure)
- [Installation and Local Setup](#-installation-and-local-setup)
- [Build and Deployment](#-build-and-deployment)
- [Environment Variables](#-environment-variables)
- [Testing Checklist](#-testing-checklist)
- [Current Limitations](#-current-limitations)
- [Future Enhancements](#-future-enhancements)

---

## 🚨 Problem Statement

Traditional salon queue management often depends on verbal communication, paper registers, or customers waiting at the salon without knowing when their turn will arrive. This can lead to:

- Unclear waiting times and uncertainty for customers.
- Reception staff having to manage the queue manually.
- Difficulty coordinating customer preferences and barber availability.
- Poor visibility of the current and upcoming tokens in the waiting area.

The Salon Queue Management System provides a digital interface to organize the queue, help customers view their token status, and give salon staff a shared set of queue-management screens.

## 🎯 Project Objectives

1. Allow customers to join the salon queue by entering their details.
2. Generate a token for each new queue entry.
3. Let customers check their queue position and service status.
4. Help reception staff add walk-in customers and manage waiting entries.
5. Give barbers a focused view of their current and next customers.
6. Display currently served and upcoming tokens on a waiting-area screen.
7. Let the owner manage services, prices, durations, barber availability, and online queue status.

## 🧩 System Overview

The application is a single-page React website with separate screens for customers and salon staff. React Router is used for page navigation. Queue information is stored in the browser's `localStorage`, and the browser `storage` event is used to update other tabs on the same browser origin.

**Important:** This version is a front-end demonstration. It does not yet use a hosted database or a real-time backend shared across different devices.

## 🛠 Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React | Build reusable UI components and screens |
| Development server / build | Vite | Run the app locally and create production build |
| Language | JavaScript (ES modules) | Application logic |
| Routing | React Router DOM | Navigate between application screens |
| Styling | CSS | Responsive layout, components, and theme |
| Browser storage | localStorage | Persist demo queue and salon settings in the browser |
| Cross-tab updates | Storage event | Notify other tabs when localStorage changes |
| Version control | Git and GitHub | Track and host source code |
| Deployment | Vercel | Publish the production website |

## 👥 User Roles and Screen Specifications

| Screen / Route | Intended user | Main functionality |
|---|---|---|
| `/` | Owner / Reception | Overview of waiting customers, barber availability, estimated wait, and served count |
| `/join` | Customer | Enter name and phone number, select services and barber, and receive a queue token |
| `/status` | Customer | Find an active queue entry using a phone number |
| `/status/:id` | Customer | View a specific queue entry, token, position, estimated wait, and journey status |
| `/reception` | Receptionist | Add walk-ins, call the next eligible customer, seat called customers, mark no-shows, and cancel entries |
| `/barber` | Barber | View assigned customers, start a service, mark it done, and update station availability |
| `/display` | Waiting area | Show each barber station's current token and the next waiting tokens |
| `/admin` | Owner | Manage services, service availability, barber status, and online queue open/close |

## ✨ Main Features

### 1. Customer Queue Joining
- Customer enters a name and a 10-digit phone number.
- Customer can select up to three active services.
- Service duration and price are shown in the selection summary.
- Customer can choose a particular barber or select **Any barber**.
- A queue token is generated after successful submission.
- An existing active queue entry for the same phone number is reused instead of creating another active entry.

### 2. Customer Status
- Shows the customer's token.
- Displays the customer's position in the waiting line.
- Calculates an approximate waiting time from the services ahead and active barbers.
- Shows the assigned barber, where available.
- Provides a queue journey from joining to completion.
- Allows the customer to cancel their queue entry.

### 3. Reception Dashboard
- Displays waiting, called, in-chair, and no-show counts.
- Shows barber stations and their current customer.
- Adds walk-in customers to the queue.
- Calls the earliest eligible customer for a selected barber.
- Allows reception to seat a called customer, mark a waiting customer as no-show, or cancel an entry.

### 4. Barber View
- Allows the barber station to be selected.
- Displays the current customer and selected services.
- Supports **Start service** and **Mark as done** actions.
- Allows the barber to set their station to **Available** or **On break**.
- Shows the next eligible customer.

### 5. Waiting Area TV Display
- Shows the current token for each barber station.
- Shows the next five waiting tokens.
- Uses a dark, high-contrast layout suitable for a larger display.

### 6. Owner Settings
- Opens or closes online queue joining.
- Adds services with a name, duration, and price.
- Enables or disables services.
- Updates barber availability and on-duty status.
- Displays basic daily queue counts.
- Includes a reset option for restoring demo data.

## 🔄 Queue Workflow and Business Rules

### Customer workflow

1. Customer opens the Join Queue screen.
2. Customer enters their name and phone number.
3. Customer selects one or more services and a barber preference.
4. The application creates a queue entry and displays the token.
5. Customer opens the personal status page.
6. Reception calls the next eligible customer.
7. Reception seats the customer.
8. Barber starts and completes the service.

### Queue statuses

| Status | Meaning |
|---|---|
| `waiting` | Customer is waiting for their turn |
| `called` | Reception has called the customer |
| `in-chair` | Customer has been seated and service is in progress |
| `done` | Service is completed |
| `cancelled` | Queue entry has been cancelled |
| `no-show` | Customer did not respond when called |

### Assignment rules implemented in the current app

- Customers are considered in queue creation order.
- A barber-specific customer is eligible only for that barber.
- A customer who selected **Any barber** can be assigned to an available barber.
- A barber marked **On break** is not eligible for a new assignment.
- A barber with a customer already in the chair cannot be assigned another customer.
- The application checks for an existing active entry with the same phone number before creating a new one.
- Closing the online queue disables customer online joining; reception can still add walk-ins.

## 🗃 Application Data Structure

The current application stores its demo data in one browser `localStorage` record:

- **Storage key:** `velvet-gold-salon-v1`

The stored object contains:

| Property | Description |
|---|---|
| `queue` | Array of customer queue entries |
| `services` | Array of salon services, duration, price, and active flag |
| `barbers` | Array of barber profiles, role, availability, and on-duty flag |
| `isOpen` | Whether online queue joining is enabled |
| `nextToken` | Number used to generate the next queue token |
| `language` | Language setting value |

A queue entry includes an ID, token, customer name, phone number, selected service IDs, barber preference, status, and creation time.

This is browser storage, not a server database. Each browser/device has its own stored data.

## 🎨 Design System and UI Theme

The interface uses a premium salon-inspired charcoal and gold theme.

| Design element | Value / usage |
|---|---|
| Primary charcoal | `#1F2937` — sidebar, dark panels, and TV display |
| Gold accent | `#D4A017` — primary buttons, tokens, highlights, and active states |
| Page background | `#F6F7F8` — main application background |
| Card background | `#FFFFFF` — content panels and forms |
| Typography | DM Sans for interface text; Playfair Display for headings |
| Layout | Rounded cards, clear spacing, responsive grids, and mobile navigation |
| Feedback | Status pills, queue indicators, confirmation prompts, and empty states |

## 📁 Project Folder Structure

```text
salon-queue-management/
│
├── docs/
│   ├── 01-brief.md
│   ├── 02-screens.md
│   └── 03-flows-rules.md
│
├── src/
│   ├── App.jsx
│   ├── data.js
│   ├── main.jsx
│   └── styles.css
│
├── .gitignore
├── AGENTS.md
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── vite.config.js
├── START-WINDOWS.bat
└── START-MAC-LINUX.sh
```

## 💻 Installation and Local Setup

### Prerequisites

- Node.js (LTS recommended)
- npm
- Git
- Visual Studio Code (recommended)

### 1. Clone the repository

```bash
git clone https://github.com/Frenny0101/salon-queue-management.git
```

### 2. Open the project folder

```bash
cd salon-queue-management
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in the terminal. Vite commonly uses:

```text
http://localhost:5173
```

## 🚀 Build and Deployment

### Create a production build

```bash
npm run build
```

Vite generates the production files in the `dist/` directory.

### Preview the production build locally

```bash
npm run preview
```

### Deploy using Vercel

1. Push the project to GitHub.
2. Sign in to Vercel using GitHub.
3. Import the `salon-queue-management` repository.
4. Select **Vite** as the framework preset.
5. Set the build command to `npm run build`.
6. Set the output directory to `dist`.
7. Deploy the project.

For React Router direct URLs such as `/join` and `/reception`, add a `vercel.json` rewrite configuration in the project root if the deployment returns a 404 on page refresh:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

After pushing new commits to the connected GitHub branch, Vercel can automatically create a new deployment.

## 🔐 Environment Variables

No environment variables are required for the current front-end version.

The application currently does not connect to:
- MongoDB or another hosted database.
- A separate backend API.
- A third-party authentication provider.
- A payment gateway.

If a backend is added later, configure its public API base URL as an appropriate Vite variable (for example, `VITE_API_URL`) in Vercel. Never place private database credentials or server-only secrets in variables prefixed with `VITE_`, because those values are exposed to browser code.

## ✅ Testing Checklist

- [ ] Home page loads and shows the dashboard.
- [ ] Customer can join with a valid 10-digit phone number.
- [ ] Customer cannot submit without selecting a service.
- [ ] Customer can select up to three services.
- [ ] Service price and duration totals update correctly.
- [ ] A new customer receives a queue token.
- [ ] Existing active phone number does not create a second active entry.
- [ ] View My Status opens the correct queue entry.
- [ ] Customer can look up an active entry using their phone number.
- [ ] Reception can add a walk-in.
- [ ] Reception can call the next eligible customer.
- [ ] Barber can start and complete a service.
- [ ] Barber can change availability.
- [ ] TV display shows current and upcoming tokens.
- [ ] Owner can add or disable a service.
- [ ] Owner can open and close online joining.
- [ ] Application layout works on mobile and desktop.
- [ ] Production build completes using `npm run build`.

## ⚠️ Current Limitations

- Queue data is stored in browser `localStorage`.
- Data is not shared between different customers' phones, browsers, or devices.
- There is no hosted database or server-side real-time synchronization.
- There is no staff login or role-based access control in this demo.
- Customer notifications by SMS, WhatsApp, or email are not implemented.
- Waiting times are estimates and can change as service duration or barber availability changes.
- The interface currently uses English labels; complete Gujarati translation is not yet implemented.

## 🔮 Future Enhancements

- Add a shared database and backend API for cross-device queue synchronization.
- Add real-time updates using WebSockets or a managed realtime service.
- Add secure authentication for owners, receptionists, and barbers.
- Add SMS or WhatsApp notifications when a customer's turn is near.
- Add complete English and Gujarati language support.
- Add reports for daily customers, service demand, and barber performance.
- Add configurable salon opening and closing hours.

---

<p align="center">
  **Salon Queue Management System**
  <br />
  Built to make salon queue handling simpler for customers and staff.
</p>
