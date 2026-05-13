# HMH Labz - Phase 2 Development Tasks

## Epic 6: Advanced Content Management (Admin Portal)
- [ ] **Task 6.1:** Integrate a WYSIWYG rich text editor (e.g., TipTap or React Quill) into the "Create/Edit Insight" view in the Admin Portal.
- [ ] **Task 6.2:** Build a drag-and-drop UI component in the Admin Portal for uploading the `coverImage`. Connect this directly to the `POST /api/upload` (Vercel Blob) endpoint we built in Phase 1.
- [ ] **Task 6.3:** Implement a "Draft" vs "Published" toggle state for Insights so the Superadmin can save work without it appearing on the public frontend immediately.

## Epic 7: SEO & Public Polish (Public Frontend)
- [ ] **Task 7.1:** Install `react-helmet-async` in the `hmh-labz-frontend` project.
- [ ] **Task 7.2:** Create dynamic `<title>` and `<meta>` tags for the `/insights/:slug` pages so that when an article is shared on LinkedIn or Twitter, it unfurls a proper OpenGraph image and description.
- [ ] **Task 7.3:** Implement a basic 404 "Not Found" page on the frontend matching the Cyber-Lab aesthetic for when a user visits a bad route.
- [ ] **Task 7.4:** Add loading skeleton states (using Tailwind `animate-pulse`) while the Insights are being fetched from the Vercel API.

## Epic 8: Workflow Automations (Integrations)
- [ ] **Task 8.1:** Build out the functional Contact Form on the landing page (`Home.jsx`).
- [ ] **Task 8.2:** Create a new endpoint on the Vercel API (`POST /api/contact`) to handle form submissions.
- [ ] **Task 8.3:** Wire the `/api/contact` endpoint to push the lead into HubSpot CRM AND trigger an internal Brevo email notification to `hello@hmhlabz.com` alerting you of a new inquiry.