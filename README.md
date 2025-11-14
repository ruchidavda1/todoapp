# Full-Stack Todo Application

A complete mobile Todo application with React Native frontend and Node.js backend.

## 🎉 **LIVE APPLICATION**
- **Backend API:** `https://todoapp-2zsx.onrender.com/api`
- **Database:** PostgreSQL on Render
- **Status:** ✅ Fully deployed and working

## 🚀 Features

### Frontend (React Native)
- Authentication (Login/Signup)
- Todo CRUD operations
- Dark/Light theme switching
- MobX state management
- React Navigation
- Modern UI/UX

### Backend (Node.js + Express)
- RESTful APIs
- JWT Authentication
- PostgreSQL with Sequelize ORM
- Input validation & security
- Docker support

## 🛠 Tech Stack

**Frontend:** React Native, TypeScript, MobX, React Navigation, Axios  
**Backend:** Node.js, Express, PostgreSQL, Sequelize, JWT, bcrypt  
**DevOps:** Docker, Render

## 📁 Project Structure

```
todo-app/
├── backend/                 # Node.js API server
│   ├── models/             # Sequelize models
│   ├── routes/             # API routes
│   ├── middleware/         # Auth middleware
│   └── server.js           # Main server
├── frontend/TodoApp/        # React Native app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── screens/        # App screens
│   │   ├── navigation/     # Navigation setup
│   │   ├── stores/         # MobX stores
│   │   └── services/       # API services
│   └── App.tsx            # Main app component
└── docker-compose.yml      # Docker setup
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18+)
- React Native development environment
- Docker (optional)

### Backend Setup
```bash
cd backend
npm install
npm start
```

### Frontend Setup

#### iOS Setup
```bash
cd frontend/TodoApp
npm install
cd ios && pod install && cd ..
npx react-native run-ios
```

#### Android Setup
```bash
cd frontend/TodoApp
npm install
npx react-native run-android
```

**Note:** Ensure Android Studio and Android SDK are installed, and an Android emulator is running or device is connected.

### Docker Setup (Alternative)
```bash
docker-compose up -d
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get profile

### Todos
- `GET /api/todos` - Get all todos
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 📱 App Features

- **Authentication Flow:** Secure login/signup
- **Todo Management:** Full CRUD operations
- **Theme Switching:** Light/Dark mode
- **Responsive Design:** Clean, modern UI
- **State Management:** Reactive MobX stores
- **Navigation:** Stack and tab navigators

## 🌐 Live Demo

The application is fully deployed and accessible:
- Backend API is live at Render
- All 8 API endpoints are functional
- PostgreSQL database is configured
- Frontend connects to production API


