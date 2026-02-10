# User CRUD Management System — Full Stack (Spring Boot + Next.js)

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
- Maven (optional — wrapper included)

---

# Backend Setup (Spring Boot)

## 1. Navigate to backend

```bash
cd backend

