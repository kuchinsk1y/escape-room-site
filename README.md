# Project Overview

## Introduction
This repository contains a modern, full-stack web application designed for the US market, featuring a scalable architecture and modular codebase. The project is divided into three main parts: **Admin Panel**, **Backend API**, and **Frontend Client**. Each part is built with industry-standard technologies to ensure maintainability, performance, and security.

---

## Monorepo Structure

- **admin/** — Next.js-based admin panel for managing platform data, users, orders, and settings. Includes authentication, dashboards, and protected routes for administrators.
- **backend/** — RESTful API server built with NestJS and TypeScript. Handles business logic, authentication, data persistence (via Prisma ORM), and integrations. Organized into modules for users, orders, payments, quests, and more.
- **frontend/** — React-based client application for end-users. Provides a seamless, interactive experience with modern UI/UX, authentication, booking, payments, and quest browsing.

---

## Detailed Folder Description

### admin/
- **src/app/** — Next.js App Router structure. Contains global styles, layouts, and route-based folders (dashboard, login, orders, payments, quests, settings, users).
- **src/components/** — Reusable UI components (Header, Sidebar, ProtectedRoute, etc.).
- **public/** — Static assets for the admin panel.
- **Configuration** — ESLint, TypeScript, PostCSS, and Next.js configs for code quality and build optimization.

### backend/
- **src/** — Main NestJS application code, organized by domain (auth, orders, payment, prisma, quests, user).
  - **auth/** — Authentication logic, guards, JWT, and admin auth.
  - **orders/**, **payment/**, **quests/**, **user/** — Business logic, controllers, services, DTOs, and data access.
  - **prisma/** — Prisma service integration for database access.
- **prisma/** — Database schema and migrations (Prisma ORM).
- **generated/** — Auto-generated Prisma client code.
- **test/** — End-to-end and integration tests.
- **Configuration** — ESLint, TypeScript, and NestJS CLI configs.

### frontend/
- **src/** — Main React application code.
  - **components/** — UI components (Header, Footer, QuestCard, etc.).
  - **pages/** — Page-level components (Catalog, Contacts, Profile, Quest Details, Auth, etc.).
  - **services/** — API service modules for data fetching and business logic.
  - **routes/** — Application routing logic.
  - **assets/** — Images and static resources.
  - **types/** — TypeScript type definitions.
- **public/** — Static assets for the client app.
- **Configuration** — ESLint, TypeScript, TailwindCSS, and PostCSS configs.

---

## Key Technologies
- **Next.js** (Admin Panel)
- **NestJS** (Backend API)
- **React** (Frontend Client)
- **TypeScript** (Type Safety)
- **Prisma ORM** (Database Access)
- **JWT Authentication**
- **TailwindCSS** (Frontend Styling)
- **PostgreSQL/MySQL** (Database, configurable)

---

## Features
- Role-based authentication and authorization
- Admin dashboard for managing users, orders, quests, and payments
- End-user client for quest discovery, booking, and payments
- Secure RESTful API with modular architecture
- Modern, responsive UI/UX
- Scalable and maintainable codebase

---

## Getting Started
See the README in each subfolder (**admin/**, **backend/**, **frontend/**) for setup and development instructions specific to each part of the project.

---

## License
This project is licensed under the MIT License.
