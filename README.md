# TaskHarbour API - Backend Server

**Live API URL:** [https://task-tempo.vercel.app/]

## 🚀 Project Overview

TaskTempo API is a backend server built for the TaskTempo freelance task management platform. This RESTful API comprehensive task management, and user data handling with MongoDB integration.

## ✨ Key Features

- **RESTful Task Management** - Complete CRUD operations for tasks with advanced filtering and sorting capabilities
- **User Management System** - User registration, profile management
- **Database Integration** - MongoDB with optimized queries.
- **Security Middleware** - CORS configuration.
- **Security Middleware** - CORS configuration.
- **Error Handling** - Comprehensive error handling with meaningful HTTP status codes and messages

## 🛠️ Technologies Used

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Security:** CORS
- **Environment:** dotenv for configuration
- **Development:** Nodemon for auto-restart

## 📡 API Endpoints

### Task Management Routes

```
GET    /tasks                  - Get all tasks
GET    /featured                  - Get all featured tasks
GET    /tasks/:id              - Get specific task details
POST   /tasks                  - Create new task
PUT    /tasks/:id              - Update task's all infomation.
PATCH    /tasks/:id              - Update speacific element of task
DELETE /tasks/:id              - Delete task
GET    /user-tasks/:userUid     - Get user's posted tasks

```

## 🔧 Development Tools

- **Nodemon:** Auto-restart during development
- **ESLint:** Code linting and formatting
- **Prettier:** Code formatting
- **Cors:** Cross-origin resource sharing

### Deployment Platform

- **Vercel:** Serverless functions

## 👨‍💻 Developer

**[Neyamat Ullah]**

- GitHub: [@neyamat7](https://github.com/neyamat7)

- Email: neyamat7.ullah@gmail.com

**Note:** This backend API serves as the foundation for the TaskTempo freelance task management platform, providing scalable server-side functionality.
