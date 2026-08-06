# 💹 WealthMetrics
### AI-Powered Personal Wealth Management & Financial Analytics Platform

<p align="center">
  <a href="https://wealthmetrics-ui.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-blue?style=for-the-badge&logo=vercel&logoColor=white&color=4f46e5" alt="Live Demo" />
  </a>
</p>

<p align="center">

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.5-6DB33F?style=for-the-badge&logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.1-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)
![License](https://img.shields.io/badge/License-MIT-success?style=for-the-badge)

</p>

---

## 📖 Overview

**WealthMetrics** is a modern full-stack financial management platform designed to help users monitor their complete financial ecosystem from a single dashboard.

The platform enables users to securely manage income, expenses, investments, budgets, and overall net worth while leveraging **Google Gemini AI** to generate personalized financial recommendations and intelligent budgeting insights.

Built using **Spring Boot**, **React**, **JWT Authentication**, and **MySQL**, the application follows modern backend architecture principles with a scalable REST API and responsive frontend.

---

# ✨ Features

### 💰 Wealth Management

- Real-time Net Worth Calculation
- Income & Expense Tracking
- Investment Portfolio Management
- Stock & Real Estate Asset Tracking
- Monthly Budget Planning
- Cashflow Monitoring

---

### 🤖 AI Financial Assistant

- Google Gemini AI Integration
- Personalized Budget Recommendations
- Spending Pattern Analysis
- Financial Health Insights
- Intelligent Savings Suggestions

---

### 🔐 Enterprise Security

- JWT Authentication
- Spring Security
- BCrypt Password Encryption
- Stateless Authentication
- Role-Based Access Control (RBAC)
- Protected REST APIs

---

### 📊 Analytics Dashboard

- Monthly Expense Analytics
- Income vs Expense Reports
- Portfolio Distribution
- Financial Trends
- Interactive Charts using Recharts

---

### 🎨 Modern User Experience

- Responsive Design
- Glassmorphism UI
- Dark Theme
- Mobile Friendly
- Reusable React Components

---

# 🏗️ System Architecture

```
                React + Vite
                     │
                     │ REST API
                     ▼
         Spring Boot Backend
                     │
      Spring Security + JWT
                     │
                     ▼
             Service Layer
                     │
                     ▼
        Spring Data JPA / Hibernate
                     │
                     ▼
                 MySQL Database
                     │
                     ▼
          Google Gemini AI API
```

---

# 🛠 Technology Stack

## Backend

| Technology | Purpose |
|------------|----------|
| Java 21 | Programming Language |
| Spring Boot | Backend Framework |
| Spring MVC | REST APIs |
| Spring Security | Authentication & Authorization |
| JWT | Stateless Authentication |
| Spring Data JPA | ORM |
| Hibernate | Persistence |
| Maven | Dependency Management |
| Lombok | Boilerplate Reduction |
| Apache POI | Excel Processing |
| MySQL | Database |

---

## Frontend

| Technology | Purpose |
|------------|----------|
| React 18 | Frontend Framework |
| Vite | Build Tool |
| Tailwind CSS | Styling |
| React Router | Routing |
| Axios | API Communication |
| Recharts | Analytics Charts |
| Lucide React | Icons |

---

# 🚀 Getting Started

## Prerequisites

Before running the project ensure the following software is installed:

- Java JDK 21+
- Node.js 18+
- npm
- MySQL 8+
- Maven

---

# Database Setup

```sql
CREATE DATABASE wealthmetrics;
```

Update the following configuration:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/wealthmetrics
spring.datasource.username=root
spring.datasource.password=your_password
```

---

# Backend Setup

```bash
git clone https://github.com/kunalkatiyarr/WealthMetrics.git

cd WealthMetrics

mvn clean install

mvn spring-boot:run
```

Backend runs at

```
http://localhost:8080
```

---

# Frontend Setup

```bash
cd wealthmetrics-ui

npm install

npm run dev
```

Frontend runs at

```
http://localhost:5173
```

---

# Project Structure

```
backend
│
├── config
├── controller
├── dto
├── entity
├── exception
├── repository
├── security
├── service
├── util

frontend
│
├── components
├── pages
├── hooks
├── services
├── context
├── assets
```

---

# Future Enhancements

- Email Notifications
- Multi-Currency Support
- Investment Performance Prediction
- OCR Receipt Scanner
- Export Reports (Excel/PDF)
- Recurring Transactions
- AI Chat Financial Advisor
- Docker Deployment
- Kubernetes Support

---

# Screenshots

> Add screenshots here

Dashboard

Login

Analytics

Investments

---

# Author

**Kunal Katiyar**

Java Backend Developer • Spring Boot • React • MySQL • REST APIs

LinkedIn

GitHub

---

# License

This project is licensed under the MIT License.