# Salon Queue Management System — Prompts

## Project Links

1. **GitHub Repository:** https://github.com/Frenny0101/salon-queue-management
2. **Live Website:** https://202612087itpvibecoding.vercel.app/

---

## About This File

This file contains an organized prompt collection for planning, building, improving, testing, and deploying the Salon Queue Management System.

The prompts are written so they can be reused with an AI coding assistant. They describe the project requirements and development tasks in sequence. They are a reconstructed, reusable prompt pack based on the implemented project and its documented features, not a verbatim transcript of every earlier chat message.

## Prompt 1 — Understand the Project and Plan the Application

```text
I want to build a Salon Queue Management System as a responsive web application.

The main purpose is to help salon customers join a queue digitally, receive a token, and check their queue status. Salon reception staff should be able to manage walk-in customers and the waiting list. Barbers should be able to manage their current services. The salon owner should be able to manage services, prices, barbers, and queue availability.

First, understand the complete requirements and prepare:
1. Project overview
2. Problem statement
3. Project objectives
4. User roles
5. List of application screens
6. Main features for each screen
7. Customer and staff workflows
8. Queue rules and validation requirements
9. Suggested project folder structure

Keep the solution suitable for a student project and explain the plan clearly before writing code.
```

## Prompt 2 — Select the Technology Stack

```text
For the Salon Queue Management System, use the following technology stack:

- React.js for the frontend
- Vite for project setup and development
- JavaScript
- React Router DOM for navigation
- CSS for responsive styling
- Browser localStorage for demo data persistence

Keep the code beginner-friendly, modular, and easy to understand.

Do not add a backend, database, payment gateway, authentication service, or external API unless I specifically request it. Clearly explain any limitations caused by using browser localStorage.
```

## Prompt 3 — Create the React + Vite Project

```text
Create the initial React + Vite project structure for the Salon Queue Management System.

Include:
- package.json
- index.html
- vite.config.js
- src/main.jsx
- src/App.jsx
- src/data.js
- src/styles.css

Configure React Router DOM and create the basic application entry point.

Provide the exact installation and run commands:
npm install
npm run dev

Make sure the project can be built using:
npm run build
```

## Prompt 4 — Design the Application Theme

```text
Design a premium, modern, responsive interface for a salon queue management website named "Velvet & Gold Salon Studio".

Use this visual theme:
- Charcoal: #1F2937
- Gold: #D4A017
- Light grey page background
- White cards and panels
- DM Sans for interface text
- Playfair Display for headings

Design requirements:
1. Clean sidebar navigation on desktop.
2. Responsive navigation on mobile.
3. Rounded cards and buttons.
4. Clear page headings and section labels.
5. Consistent spacing and typography.
6. Queue status pills and customer token styling.
7. Professional forms, tables, and dashboard cards.

The design should feel premium but remain simple and easy to use. Avoid unnecessary animations and visual clutter.
```

## Prompt 5 — Build the Shared Application Data

```text
Create the initial data structure for the Salon Queue Management System.

Add demo data for:
1. Salon services
2. Barbers
3. Queue customers

Each service should contain:
- id
- name
- Gujarati name field
- duration in minutes
- price
- active status

Each barber should contain:
- id
- name
- role
- availability status
- active/on-duty status

Each queue entry should contain:
- unique id
- token number
- customer name
- phone number
- selected service IDs
- preferred barber
- queue status
- creation timestamp

Use these queue statuses:
- waiting
- called
- in-chair
- done
- cancelled
- no-show

Store the application data in localStorage and provide initial demo data when no saved data exists.
```

## Prompt 6 — Create Shared State and Cross-Tab Updates

```text
Implement shared application state for the Salon Queue Management System.

Requirements:
1. Load saved application data from localStorage.
2. Use initial demo data when no saved data exists.
3. Save updates back to localStorage.
4. Listen to the browser storage event so other tabs on the same browser origin can receive updates.
5. Keep queue, services, barbers, online queue availability, and next token number in the shared state.
6. Avoid mutating the previous state directly.

Important limitation:
localStorage is browser-specific. Do not claim that it synchronizes data between different phones, browsers, or devices. Explain that a hosted backend and shared database would be required for that.
```

## Prompt 7 — Build the Main Navigation and Layout

```text
Create the main application layout for Velvet & Gold Salon Studio.

Include:
- Sidebar with the salon logo and navigation links
- Overview
- Join Queue
- My Status
- Reception
- Barber View
- TV Display
- Owner Settings
- Top header with breadcrumb and live system indicator
- Main content area
- Footer

Use React Router DOM for navigation.

Make the layout responsive for desktop, tablet, and mobile screens. Keep the charcoal and gold theme consistent across all pages.
```

## Prompt 8 — Build the Home / Overview Dashboard

```text
Build the Home dashboard for the Salon Queue Management System.

Show these statistics:
1. People waiting
2. Barbers working
3. Estimated waiting time
4. Customers served today

Add:
- Live queue preview
- Customer token
- Customer name
- Selected services
- Preferred barber
- Waiting duration
- Barber availability list
- Queue open/closed indicator
- Quick links to Reception and Owner Settings

Calculate the displayed values from the shared application state. Add a clean empty state when no customers are waiting.
```

## Prompt 9 — Build the Customer Join Queue Screen

```text
Build the customer Join Queue screen.

Customer form fields:
- Full name
- 10-digit mobile number
- Service selection
- Barber preference

Requirements:
1. Validate that the name is not empty.
2. Validate that the phone number contains exactly 10 digits.
3. Allow customers to select up to three services.
4. Show each service's duration and price.
5. Calculate total service duration and price.
6. Allow the customer to choose Any Barber or a specific barber.
7. Show an estimated waiting time.
8. Disable online joining when the owner closes the online queue.
9. Prevent duplicate active queue entries for the same phone number.
10. Generate a new token for a new customer.
11. Show a confirmation screen after successful joining.

Keep the form responsive and beginner-friendly.
```

## Prompt 10 — Build the Customer Token Confirmation

```text
After a customer successfully joins the salon queue, display a confirmation screen.

Show:
- Customer name
- Generated queue token
- Queue position
- Selected services
- Confirmation message
- View My Status button

The View My Status button must navigate to the exact queue entry using its unique ID, for example:
`/status/:id`

Do not rely on a temporary variable that may be unavailable after a React state update. Create the queue item before calling the state update, then use that same item to update the state and navigate.

Make sure the button works for every newly created queue entry.
```

## Prompt 11 — Build the Customer My Status Screen

```text
Build the My Status screen for customers.

Support these routes:
- /status
- /status/:id

For a specific queue entry, display:
1. Customer token
2. Customer name
3. Position in the waiting line
4. Estimated waiting time
5. Assigned or preferred barber
6. Selected services
7. Current queue status
8. Queue journey

The queue journey should show:
- Joined queue
- Called by barber
- Service in progress
- Completed

Allow customers to cancel their queue entry after confirmation.

Also provide phone-number lookup on /status. When a matching active queue entry is found, navigate to its specific status route.

Handle invalid IDs and missing queue entries gracefully. Keep the page responsive.
```

## Prompt 12 — Fix Customer Status Navigation

```text
Review the Join Queue and My Status components carefully.

There is a bug where a customer receives a token but clicking "View My Status" does not open their status page correctly.

Fix the issue while preserving the existing application design and other features.

Requirements:
1. Create the queue item before calling the state update function.
2. Assign a unique ID to the queue item.
3. Add the exact same item to the queue state.
4. Set the created customer state using that same item.
5. Navigate to `/status/${item.id}`.
6. Make sure the Status component reads the ID from React Router's useParams.
7. Make phone-number lookup navigate to the matching customer's status route.
8. Ensure the status page can be refreshed while the queue entry still exists in localStorage.
9. Do not use window.location for internal React Router navigation when navigate() is available.
10. Preserve all existing screens, styles, queue actions, and business rules.

Return the complete updated App.jsx file, not only a code snippet.
```

## Prompt 13 — Build the Reception Dashboard

```text
Build the Reception Dashboard for the salon staff.

Show:
- Waiting customers
- Called customers
- Customers currently in the chair
- No-shows today

Add barber station cards showing:
- Barber name
- Role
- Current customer
- Current token
- Availability
- Call Next button

Add a waiting list table with:
- Token
- Customer name
- Phone number
- Services
- Preferred barber
- Waiting time
- Actions

Reception actions:
1. Add a walk-in customer.
2. Call the next eligible customer.
3. Seat a customer who has been called.
4. Mark a waiting customer as no-show.
5. Cancel a queue entry.

The Call Next action must respect barber preference and availability. A customer who selected a specific barber must not be assigned to a different barber.
```

## Prompt 14 — Build the Barber View

```text
Build a Barber View for salon employees.

Requirements:
1. Allow selection of an active barber.
2. Display the current customer's token and name.
3. Display the customer's selected services.
4. Show the service start time or elapsed time where available.
5. Add a Start Service action for a called customer.
6. Add a Mark as Done action for a customer in the chair.
7. Allow the barber to change station availability to Available or On Break.
8. Show the next eligible customer.

Update the shared queue state when an action is performed so the other screens in the same browser origin can reflect the changes.
```

## Prompt 15 — Build the Waiting Area TV Display

```text
Build a Waiting Area TV Display for the Salon Queue Management System.

Requirements:
1. Use a dark charcoal background with gold highlights.
2. Show salon branding.
3. Show one station card for each active barber.
4. Display the current token being served by each barber.
5. Show whether a barber is serving a customer, has called a customer, or is available.
6. Display the next five waiting tokens.
7. Use large, readable typography suitable for a television or large monitor.
8. Keep the layout responsive.

Read the queue and barber information from the shared application state.
```

## Prompt 16 — Build Owner Settings

```text
Build the Owner Settings screen.

Include the following sections:

1. Queue Availability
   - Open online queue
   - Close online queue

2. Services and Pricing
   - Display service name
   - Display duration
   - Display price
   - Enable or disable a service
   - Add a new service

3. Barbers on Duty
   - Display barber name and role
   - Set Available, Busy, or On Break
   - Enable or disable on-duty status

4. Daily Performance
   - Customers served
   - No-shows
   - Active queue count

5. Demo Data
   - Add a confirmation-protected option to reset the demo data.

All changes should update the shared application state and persist in localStorage.
```

## Prompt 17 — Implement Queue Rules and Validation

```text
Review the complete queue logic and implement the following rules consistently.

1. Generate sequential customer tokens.
2. Prevent a phone number from having more than one active queue entry.
3. Preserve first-come-first-served ordering.
4. Assign a customer to their selected barber or Any Barber.
5. Never assign a named-barber customer to a different barber.
6. Do not assign a new customer to a barber who is on break.
7. Do not assign a second in-chair customer to the same barber.
8. Support Waiting, Called, In Chair, Done, Cancelled, and No-show statuses.
9. Calculate an approximate waiting time using service duration and eligible active barbers.
10. When an entry is cancelled or marked no-show, it must no longer count as an active waiting entry.

Check edge cases and explain any limitations in the current implementation.
```

## Prompt 18 — Make the Application Responsive

```text
Review all screens of the Salon Queue Management System and make them responsive.

Test the following screen sizes:
- Desktop
- Laptop
- Tablet
- Mobile phone

Check:
1. Sidebar and mobile navigation
2. Dashboard statistic cards
3. Customer forms
4. Service selection cards
5. Barber selection
6. Reception tables
7. Barber station cards
8. TV display
9. Owner settings
10. Buttons, inputs, and modals

Prevent horizontal overflow. Make important actions easy to tap on mobile. Preserve the charcoal and gold visual theme.
```

## Prompt 19 — Review the Complete Project and Fix Bugs

```text
Review the entire Salon Queue Management System project.

Inspect:
- src/App.jsx
- src/data.js
- src/main.jsx
- src/styles.css
- package.json
- index.html
- vite.config.js

Check for:
1. React errors
2. Missing imports
3. Invalid JSX
4. Broken React Router routes
5. Incorrect queue state updates
6. Incorrect token generation
7. Customer status navigation errors
8. Invalid form validation
9. Incorrect barber assignment
10. Responsive layout issues

Do not remove working features or redesign the application unnecessarily.

Fix the problems and return complete updated files for every file that needs changes. Explain how to test the fixes.
```

## Prompt 20 — Prepare the Project for GitHub

```text
Prepare the Salon Queue Management System for GitHub.

Check that the project contains:
- README.md
- AGENTS.md
- docs/
- src/
- package.json
- index.html
- vite.config.js
- .gitignore

Make sure node_modules and dist are ignored by Git.

Write clear installation instructions and explain the current localStorage limitation. Do not include passwords, private API keys, or other secrets.

Provide the Git commands to initialize the repository, commit the project, connect the GitHub remote, and push the main branch.
```

## Prompt 21 — Create the Project README

```text
Create a detailed and professional README.md for the Salon Queue Management System.

Use plain Markdown only:
- No centered HTML blocks
- No HTML image tags
- No technology badge images

Include:
1. Project title and introduction
2. GitHub repository link
3. Live website link
4. Table of Contents
5. Problem Statement
6. Project Objectives
7. System Overview
8. Technology Stack
9. User Roles and Screen Specifications
10. Main Features
11. Queue Workflow and Business Rules
12. Application Data Structure
13. Design System and UI Theme
14. Project Folder Structure
15. Installation and Local Setup
16. Build and Deployment
17. Environment Variables
18. Testing Checklist
19. Current Limitations
20. Future Enhancements

Keep every technical claim accurate to the actual code. Do not claim that a database, authentication, or multi-device synchronization exists unless it has been implemented.
```

## Prompt 22 — Deploy the Application on Vercel

```text
Guide me through deploying the Salon Queue Management System on Vercel using my GitHub repository.

Repository:
https://github.com/Frenny0101/salon-queue-management

Requirements:
1. Import the GitHub repository into Vercel.
2. Select Vite as the framework preset.
3. Use `npm install` as the install command.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.
6. Explain whether environment variables are required.
7. Configure React Router rewrites if direct page refreshes return 404.
8. Explain how automatic deployment works after pushing to GitHub.
9. Help me verify the production deployment.

Give instructions one step at a time and explain any deployment errors.
```

## Prompt 23 — Fix React Router Refresh Errors on Vercel

```text
My React application uses React Router DOM and is deployed on Vercel.

Directly opening or refreshing routes such as /join, /reception, /barber, /display, and /admin may return a 404 error.

Help me configure Vercel rewrites so that application routes are served by the React entry page.

If needed, create a vercel.json file in the project root with the correct rewrite configuration.

Explain how to test the routes locally and after deployment.
```

## Prompt 24 — Update the Project and Redeploy

```text
I have made changes to the Salon Queue Management System.

Review the changed files, preserve existing functionality, and help me test the application locally.

Then provide the Git commands to:
1. Check changed files
2. Add the changes
3. Commit with a clear message
4. Push to the main branch

Explain how to verify that Vercel has deployed the latest GitHub commit.
```

## Prompt 25 — Future Enhancement: Shared Real-Time Queue

```text
I want to upgrade the Salon Queue Management System from browser localStorage to a real multi-device application.

Plan a backend architecture that allows customers using different phones and salon staff using different computers to share the same live queue.

Requirements:
1. Use a shared database.
2. Create secure backend APIs.
3. Add real-time queue updates.
4. Preserve customer tokens and queue status.
5. Add staff authentication and role-based access.
6. Keep the existing React frontend design.
7. Protect private credentials on the server.
8. Explain database schema, API routes, authentication, deployment, and migration from localStorage.

First provide the architecture and implementation plan. Do not claim these features are already present in the current version.
```

---

## Suggested Prompt Execution Order

Use the prompts in this order when recreating or extending the project:

1. Project planning and requirements — Prompts 1–2
2. Project setup and design — Prompts 3–4
3. Data and application structure — Prompts 5–7
4. Customer screens — Prompts 8–12
5. Staff and owner screens — Prompts 13–16
6. Queue rules and responsive design — Prompts 17–18
7. Testing and documentation — Prompts 19–21
8. GitHub and Vercel deployment — Prompts 20, 22–24
9. Future real-time backend — Prompt 25

## Important Project Note

The current deployed application is a frontend demonstration that uses browser `localStorage`. Data is not shared between separate devices or browsers. A hosted backend and shared database are required before using it as a real multi-device salon queue system.
