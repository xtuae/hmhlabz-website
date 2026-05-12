# HMH Labz - Phase 1 Development Tasks

## Epic 1: Single-Function API Core (Vercel)
- [x] **Task 1.1:** Initialize Node.js project. Create a `vercel.json` file configured to rewrite all `/api/(.*)` requests to `/api/index.js`.
- [x] **Task 1.2:** Install Prisma client, connect to NEON DB, and push the initial `User` and `Insight` schema.
- [x] **Task 1.3:** Set up a lightweight router (e.g., Express) inside a single `/api/index.js` file to handle all incoming requests.
- [x] **Task 1.4:** Implement JWT-based Authentication routes (`/auth/login`, `/auth/register`) within the single router instance.
- [x] **Task 1.5:** Implement Role-Based Access Control (RBAC) middleware for the router.
- [x] **Task 1.6:** Add CRUD routes for Insights (`GET`, `POST`, `PUT`, `DELETE` under `/insights`) within the same router instance.

## Epic 2: Integrations (Added to Single Function)
- [x] **Task 2.1:** Add a route within the single API function (`/upload`) to integrate Vercel Blob Storage for Insight cover images.
- [x] **Task 2.2:** Integrate Brevo API within the router for transactional emails (e.g., Welcome email).
- [x] **Task 2.3:** Integrate HubSpot API within the router to push new registered users as Contacts.

## Epic 3: Public Frontend (React Vite)
- [ ] **Task 3.1:** Initialize Vite React project. Configure TailwindCSS and React Router.
- [ ] **Task 3.2:** Build the single-page application (SPA) landing page sections (Hero, About, Services, Contact).
- [ ] **Task 3.3:** Build the `/insights` feed page fetching data from the API and the dynamic `/insights/:slug` article page.
- [ ] **Task 3.4:** Build static Legal Pages (Privacy Policy, Terms & Conditions).
- [ ] **Task 3.5:** Implement state management (Zustand or Context) for standard `USER` login/session handling.

## Epic 4: Admin Portal (React Vite - `/labz-admin/`)
- [ ] **Task 4.1:** Initialize a second Vite React project. Update `vite.config.js` with `base: '/labz-admin/'`.
- [ ] **Task 4.2:** Implement an Admin Login view.
- [ ] **Task 4.3:** Build Dashboard layout (Sidebar, Header, Main Content Area).
- [ ] **Task 4.4:** Implement Higher-Order Components (HOC) or Route Guards to strictly enforce RBAC rendering.
- [ ] **Task 4.5:** Build "Manage Insights" view (WYSIWYG editor integration, Vercel Blob image uploader, publish toggle).
- [ ] **Task 4.6:** Build "Manage Users" view (Superadmin/Admin only: change roles, delete users).

## Epic 5: Build & Deployment Preparation
- [ ] **Task 5.1:** Set up Vercel project for the API directory and configure environment variables (Neon DB URL, JWT Secret, Blob Token, Brevo Key, HubSpot Key).
- [ ] **Task 5.2:** Build the Public Frontend (`npm run build`).
- [ ] **Task 5.3:** Build the Admin Portal (`npm run build`) and output it to a folder named `labz-admin`.
- [ ] **Task 5.4:** Verify `labz-admin` routing works seamlessly alongside the main build for Shared Hosting deployment.