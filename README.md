# Task Manager – Backend Practical Assessment (2 Hours)

## 📌 Overview

This repository contains a **partially implemented Task Manager REST API** built using:

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* bcryptjs
* dotenv

The application includes:

* User registration and login with hashed passwords
* JWT-protected task management endpoints (CRUD)
* Modular folder structure (controllers / services / routes / middleware / models)
* Global error handling middleware

The project intentionally contains **incomplete functionality and behavioral issues** that you must identify and resolve.

Your goal is to **analyze the existing codebase, identify problems, and implement the required improvements**.

---

# ⏳ Time Limit

You have **2 hours** to complete this assessment.

Focus on:

* Correctness
* Clean implementation
* Proper API design
* Consistent error handling

Avoid unnecessary complexity or over-engineering.

---

# 🛠 Setup Instructions

### 1️⃣ Install dependencies

```
npm install
```

### 2️⃣ Configure environment variables

```
cp .env.example .env
```

Open `.env` and fill in your values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_super_secret_key_here
```

You may use either:

* A local MongoDB instance
* MongoDB Atlas

---

### 3️⃣ Run the development server

```
npm run dev
```

The server will start at:

```
http://localhost:5000
```

---

# 🌐 API Information

Base URL:

```
http://localhost:5000
```

All protected routes require a **JWT token** in the Authorization header:

```
Authorization: Bearer <your_token>
```

---

# Auth Endpoints

| Method | Endpoint           | Description             | Auth Required |
| ------ | ------------------ | ----------------------- | ------------- |
| POST   | /api/auth/register | Register a new user     | No            |
| POST   | /api/auth/login    | Login and receive token | No            |

---

# Task Endpoints

| Method | Endpoint       | Description       | Auth Required |
| ------ | -------------- | ----------------- | ------------- |
| GET    | /api/tasks     | Get tasks         | Yes           |
| POST   | /api/tasks     | Create a task     | Yes           |
| GET    | /api/tasks/:id | Get a single task | Yes           |
| PUT    | /api/tasks/:id | Update a task     | Yes           |
| DELETE | /api/tasks/:id | Delete a task     | Yes           |

---

# 📋 Tasks To Complete

The current implementation contains **several behavioral issues and missing features**.
Investigate the codebase and implement the following improvements.

---

## 1️⃣ Task Authorization

Users should only be able to modify tasks that they created.

Review the task update logic and ensure that proper authorization checks are enforced so that users cannot modify tasks belonging to other users.

---

## 2️⃣ Authentication Error Handling

The authentication middleware currently does not handle all token-related errors consistently.

Ensure that:

* Invalid tokens
* Expired tokens
* Malformed tokens
* Missing tokens

all return **appropriate HTTP 401 responses with clear error messages**.

---

## 3️⃣ Task Ownership in List Endpoint

Users should only see tasks that belong to them.

Review the logic used in the task listing endpoint and ensure it properly respects user ownership.

---

## 4️⃣ Implement Task Filtering

Add support for filtering tasks by **status** using query parameters.

Example:

```
GET /api/tasks?status=pending
GET /api/tasks?status=in-progress
GET /api/tasks?status=completed
```

Invalid status values should return **400 Bad Request**.

---

## 5️⃣ Implement Pagination

Add pagination support to the task listing endpoint.

Example:

```
GET /api/tasks?page=1&limit=10
```

Default values:

```
page = 1
limit = 10
```

The response should include pagination metadata.

Example response format:

```
{
  "success": true,
  "total": 47,
  "page": 1,
  "pages": 5,
  "count": 10,
  "data": []
}
```

---

# 📊 Example API Responses

### Register User

POST /api/auth/register

Request:

```
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "password": "secret123"
}
```

Response:

```
{
  "success": true,
  "data": {
    "_id": "664a1f2e3c4b5a6d7e8f9012",
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "token": "JWT_TOKEN"
  }
}
```

---

### Create Task

POST /api/tasks

Request:

```
{
  "title": "Write unit tests",
  "description": "Cover all service functions",
  "status": "pending",
  "dueDate": "2025-06-01"
}
```

Response:

```
{
  "success": true,
  "data": {
    "_id": "...",
    "title": "Write unit tests",
    "status": "pending"
  }
}
```

---

# Error Response Example

```
{
  "message": "Not authorized, token failed"
}
```

---

# 📦 Submission Instructions

1. Fork this repository

2. Create a branch

```
feature/your-name
```

3. Implement your solution

4. Commit your changes with meaningful commit messages

5. Push your fork and open a **Pull Request**

---

# Pull Request Description

In your PR description include:

* The issues you identified
* The changes you made
* Any assumptions you made
* What improvements you would implement with more time

---

# 📊 Evaluation Criteria

You will be evaluated on:

* Debugging ability
* Correct API behavior
* Authorization and data ownership handling
* Pagination and filtering implementation
* Code readability and structure
* Error handling
* Commit quality
* Explanation in the PR description

---

# 🎯 What We Are Looking For

This assessment evaluates:

* Your ability to work with an existing codebase
* Your debugging and reasoning skills
* Your understanding of REST API design
* Your ability to implement features incrementally
* Your attention to detail and engineering maturity

---

If you want, I can also show you **one small trick that makes this assignment 10x better for hiring Node developers** — something used by companies like **Stripe and Shopify in backend interviews**.
