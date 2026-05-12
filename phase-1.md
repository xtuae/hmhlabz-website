# HMH Labz - Phase 1 Development Tasks

## Epic 1: Database & API Core (Vercel)
- [ ] **Task 1.1:** Initialize Node.js project with Vercel configuration (`vercel.json`).
- [ ] **Task 1.2:** Install Prisma client, connect to NEON DB, and push the initial `User` and `Insight` schema.
- [ ] **Task 1.3:** Implement JWT-based Authentication APIs (`POST /api/auth/login`, `POST /api/auth/register`).
- [ ] **Task 1.4:** Implement Role-Based Access Control (RBAC) middleware to protect Vercel API routes based on JWT payload (SUPERADMIN, ADMIN, MODERATOR, USER).
- [ ] **Task 1.5:** Create CRUD API routes for Insights (`GET`, `POST`, `PUT`, `DELETE` under `/api/insights`).

## Epic 2: Integrations (Vercel API)
- [ ] **Task 2.1:** Integrate Vercel Blob Storage API for uploading Insight cover images. Create an upload endpoint (`POST /api/upload`).
- [ ] **Task 2.2:** Integrate Brevo API for transactional emails (e.g., Welcome email on registration, Password reset).
- [ ] **Task 2.3:** Integrate HubSpot API. Create a webhook or middleware that pushes new registered user data to HubSpot CRM as a Contact.

## Epic 3: Public Frontend (React Vite)
- [ ] **Task 3.1:** Initialize Vite React project. Configure TailwindCSS and React Router.
- [ ] **Task 3.2:** Build the single-page application (SPA) landing page sections (Hero, About, Services, Contact).
- [ ] **Task 3.3:** Build the `/insights` feed page fetching data from `/api/insights` and the dynamic `/insights/:slug` article page.
- [ ] **Task 3.4:** Build static Legal Pages (Privacy Policy, Terms & Conditions).
- [ ] **Task 3.5:** Implement state management (Zustand or Context) for standard `USER` login/session handling.

## Epic 4: Admin Portal (React Vite - `/labz-admin/`)
- [ ] **Task 4.1:** Initialize a second Vite React project. Update `vite.config.js` with `base: '/labz-admin/'`.
- [ ] **Task 4.2:** Implement an Admin Login view.
- [ ] **Task 4.3:** Build Dashboard layout (Sidebar, Header, Main Content Area).
- [ ] **Task 4.4:** Implement Higher-Order Components (HOC) or Route Guards to strictly enforce RBAC rendering (e.g., Moderators cannot see "Manage Users").
- [ ] **Task 4.5:** Build "Manage Insights" view (WYSIWYG editor integration, Vercel Blob image uploader, publish toggle).
- [ ] **Task 4.6:** Build "Manage Users" view (Superadmin/Admin only: change roles, delete users).

## Epic 5: Build & Deployment Preparation
- [ ] **Task 5.1:** Set up Vercel project for the API directory and configure environment variables (Neon DB URL, JWT Secret, Blob Token, Brevo Key, HubSpot Key).
- [ ] **Task 5.2:** Build the Public Frontend (`npm run build`).
- [ ] **Task 5.3:** Build the Admin Portal (`npm run build`) and output it to a folder named `labz-admin`.
- [ ] **Task 5.4:** Verify `labz-admin` routing works seamlessly alongside the main build for Shared Hosting deployment.