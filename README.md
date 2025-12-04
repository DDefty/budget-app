# Finance Tracker – Full-Stack Personal Budget Application

Finance Tracker is a full-stack web application for managing personal finances. It allows users to track income and expenses, analyze spending patterns, review recent transactions, and update personal account settings.

The project consists of a **React (Vite + TypeScript)** frontend and a **Node.js backend built with Express, Prisma, and PostgreSQL**.

## 🚀 Tech Stack

### Frontend (web/)
- React 19 + TypeScript
- Vite
- Redux Toolkit + Redux Persist
- TanStack React Query
- TailwindCSS, Material Tailwind, HeadlessUI, Flowbite
- React Router DOM
- Framer Motion
- Recharts
- Zod
- Axios

### Backend (api/)
- Node.js + Express 5 (TypeScript)
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcryptjs
- Zod
- Helmet + CORS
- Faker.js (seeding)
- Vitest + Supertest (API tests)

## ✨ Key Features

### 🔐 Authentication
- Register and login using JWT-based authentication
- Secure password hashing (bcrypt)
- Zod validation on both client and server
- Clear error messages displayed as toasts

### 🏠 Dashboard
- Total balance preview
- Monthly spending summary
- Upcoming bills
- Expense analysis chart
- Smart recommendations based on spending patterns
- List of recent transactions
- Loading states for API calls

### 💳 Transaction Management
- Full CRUD operations
- Add Income or Expense via modal dialogs
- Category, amount, and date filters
- Pagination
- Free-text search
- Smooth animations with Framer Motion
- Form validation using Zod

### ⚙️ User Settings
- Update email, name, gender, date of birth
- Privacy Settings
- Help & Support
- About section
- Logout functionality

## 🗄️ Project Structure

```
/
├── api/       → Backend (Express + Prisma + PostgreSQL)
└── web/       → Frontend (React + TypeScript + TailwindCSS)
```

## 🛠️ Getting Started

### Backend Setup
```bash
cd api
npm install
npx prisma migrate dev
npm run dev
```

### Frontend Setup
```bash
cd web
npm install
npm run dev
```

## 🎯 Purpose of the Project

Finance Tracker is built as a clean, modern tool for everyday budgeting.  
It demonstrates strong full-stack engineering skills, including:

- API design & backend architecture
- Authentication & secure session handling
- React app structure with modern tooling
- Database design using Prisma
- TypeScript best practices
- UI/UX with TailwindCSS + component libraries
- Frontend & backend automated testing

## 📸 Demo
![Demo](assets/Demo.gif)


