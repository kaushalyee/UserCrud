# User CRUD  — Full Stack (Spring Boot + Next.js)

## Overview

This repository contains a full-stack User CRUD Management System with:

- **Backend** — Spring Boot REST API
- **Frontend** — Next.js (React) application with Redux Toolkit
- Full Create, Read, Update, Delete functionality
- API integration between frontend and backend
- Redux global state management
- Responsive UI with Tailwind CSS
- Frontend automated testing with Jest and React Testing Library

Both applications are kept in a single repository for simplified setup and evaluation.

---

# Repository Structure



---

# Tech Stack

## Backend
- Java
- Spring Boot
- Maven
- REST API
- JPA / Service Layer Architecture

## Frontend
- Next.js (React)
- Redux Toolkit
- React Redux
- Tailwind CSS
- Jest
- React Testing Library

---

# Features

## Backend API
- Create user
- Get all users
- Get user by ID
- Update user
- Delete user
- Exception handling
- CORS configuration for frontend access

## Frontend UI
- List users (cards layout)
- View user details
- Create user form
- Edit user form (prefilled)
- Delete with confirmation
- Loading / empty / error states
- Mobile responsive design

## State Management
- Redux Toolkit store
- Async thunks for API calls
- Centralized user state
- Predictable updates

## Testing (Frontend)
- User list rendering tests
- Loading / error / empty state tests
- Create user test
- Edit user test
- Delete user test
- Redux slice reducer test

---

# Prerequisites

## Required

- Java 17+
- Node.js 18+
- npm
- Maven 

---

# Backend Setup (Spring Boot)

## 1. Navigate to backend
```bash
cd backend
```
Step 1 — Check Java Version
Make sure Java is installed:
```bash
java -version
```
Step 2 — Build the Project
```bash
mvn clean install
```
Step 3 — Run the Backend Server
```bash

mvn spring-boot:run

```

# Frontend Setup — User CRUD App (Next.js)

This is the Next.js + Redux Toolkit frontend for the User CRUD system.  
Follow these steps to install and run it locally.

---

## Requirements

- Node.js 18 or higher
- npm
- Backend API running (Spring Boot service)

Check versions:

```bash
node -v
npm -v
```
Step 1 — Go to frontend folder
```bash

cd frontend

```
Step 2 — Install dependencies
```bash

npm install
```
Step 3 — Configure Backend API URL

```bash

.env.local
```
Add this line:
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:PORT/api
```
Step 4 — Start the frontend server
```bash

npm run dev
```
Step 5 — Run frontend tests 
```bash

npm test


