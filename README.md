# 📱 Full-Stack Todo Application

A complete full-stack mobile Todo application built with React Native frontend and Node.js backend, featuring authentication, CRUD operations, and modern UI/UX design.

## 🎉 **LIVE APPLICATION**
- **Backend API:** `https://todoapp-2zsx.onrender.com/api`
- **Database:** PostgreSQL on Render
- **Status:** ✅ Fully deployed and working

## 📱 **Screenshots**

### iOS App Interface
<div align="center">
  <img src="screenshots/ios-login.png" alt="Login Screen" width="250"/>
  <img src="screenshots/ios-signup.png" alt="Signup Screen" width="250"/>
  <img src="screenshots/ios-todos.png" alt="Todo List" width="250"/>
</div>

<div align="center">
  <img src="screenshots/ios-add-todo.png" alt="Add Todo" width="250"/>
  <img src="screenshots/ios-profile.png" alt="User Profile" width="250"/>
  <img src="screenshots/ios-dark-mode.png" alt="Dark Mode" width="250"/>
</div>

### Key Features Demo
<div align="center">
  <img src="screenshots/feature-auth.gif" alt="Authentication Flow" width="250"/>
  <img src="screenshots/feature-crud.gif" alt="Todo CRUD Operations" width="250"/>
  <img src="screenshots/feature-theme.gif" alt="Theme Switching" width="250"/>
</div>

### Backend API Testing
<div align="center">
  <img src="screenshots/api-postman.png" alt="API Testing with Postman" width="600"/>
</div>

## 🚀 **Features**

### Frontend (React Native)
- ✅ **Authentication**: Login/Signup with JWT tokens
- ✅ **Todo Management**: Complete CRUD operations
- ✅ **Modern UI**: Clean, responsive design with animations
- ✅ **Theme Switching**: Light and dark mode support
- ✅ **State Management**: MobX for reactive state management
- ✅ **Navigation**: React Navigation with stack and tab navigators
- ✅ **Priority System**: Low, medium, high priority todos
- ✅ **Profile Management**: Update user profile information

### Backend (Node.js + Express)
- ✅ **RESTful APIs**: Complete CRUD operations for todos and authentication
- ✅ **JWT Authentication**: Secure token-based authentication
- ✅ **PostgreSQL Database**: Robust data persistence with Sequelize ORM
- ✅ **Input Validation**: Comprehensive validation and error handling
- ✅ **Security**: Helmet, CORS, and bcrypt for password hashing
- ✅ **Middleware**: Authentication middleware for protected routes
- ✅ **Docker Support**: Containerized application for easy deployment

## 🛠 **Tech Stack**

### Frontend
- **React Native** 0.81.5
- **TypeScript** for type safety
- **MobX** for state management
- **React Navigation** for routing
- **Axios** for HTTP requests
- **AsyncStorage** for local data persistence

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **Sequelize** ORM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Helmet** for security headers
- **CORS** for cross-origin requests
- **Morgan** for logging

### DevOps
- **Docker** & Docker Compose
- **Render** for deployment
- **ESLint** & Prettier for code quality

## 📁 **Project Structure**

```
todo-app/
├── backend/                 # Node.js backend
│   ├── middleware/         # Authentication middleware
│   ├── models/            # Sequelize models (User, Todo)
│   ├── routes/            # API routes (auth, todos)
│   ├── server.js          # Main server file
│   └── package.json       # Backend dependencies
├── frontend/              # React Native frontend
│   └── TodoApp/
│       ├── src/
│       │   ├── components/    # Reusable components
│       │   ├── navigation/    # Navigation setup
│       │   ├── screens/       # App screens
│       │   ├── services/      # API services
│       │   ├── stores/        # MobX stores
│       │   ├── types/         # TypeScript types
│       │   └── utils/         # Utility functions
│       ├── android/           # Android project
│       ├── ios/              # iOS project
│       ├── App.tsx           # Main app component
│       └── package.json      # Frontend dependencies
├── docker-compose.yml        # Development setup
├── docker-compose.prod.yml   # Production setup
├── Dockerfile               # Docker configuration
├── render.yaml              # Render deployment config
└── README.md               # This file
```

## 🚦 **Getting Started**

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- React Native development environment
- Docker & Docker Compose (optional)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/ruchidavda1/todoapp.git
   cd todoapp
   ```

2. **Start the application with Docker**
   ```bash
   # Development mode
   docker-compose up -d
   
   # Production mode
   docker-compose -f docker-compose.prod.yml up -d
   ```

3. **The backend will be available at:**
   - API: http://localhost:3000
   - Health check: http://localhost:3000/api/health

### Option 2: Manual Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

4. **Start the server**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm start
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend/TodoApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install iOS dependencies (iOS only)**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Start the React Native app**
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## 🔧 **API Endpoints**

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Todos
- `GET /api/todos` - Get all todos (protected)
- `POST /api/todos` - Create new todo (protected)
- `GET /api/todos/:id` - Get specific todo (protected)
- `PUT /api/todos/:id` - Update todo (protected)
- `PATCH /api/todos/:id/toggle` - Toggle todo completion (protected)
- `DELETE /api/todos/:id` - Delete todo (protected)
- `DELETE /api/todos/completed/all` - Delete all completed todos (protected)

### Query Parameters for GET /api/todos
- `page` - Page number for pagination
- `limit` - Number of items per page
- `completed` - Filter by completion status (true/false)
- `priority` - Filter by priority (low/medium/high)
- `search` - Search in title and description

## 🎨 **App Features**

### Authentication
- JWT token-based authentication
- Secure password hashing with bcrypt
- User profile management
- Token validation middleware

### Todo Management
- Complete CRUD operations
- Priority levels (low, medium, high)
- Completion status tracking
- Search and filtering capabilities
- Bulk operations (delete all completed)
- Pagination support

### User Experience
- Smooth navigation with React Navigation
- Theme switching (light/dark mode)
- Loading states and error handling
- Responsive design for different screen sizes
- Real-time backend synchronization

## 🐳 **Docker Commands**

```bash
# Start development environment
docker-compose up -d

# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Rebuild and start
docker-compose up --build -d

# Remove volumes (reset database)
docker-compose down -v
```

## 🧪 **Testing**

### Backend Testing
```bash
cd backend
npm test
```

### Frontend Testing
```bash
cd frontend/TodoApp
npm test
```

## 🚀 **Deployment**

The application is configured for deployment on Render using the included `render.yaml` configuration.

### Environment Variables (Production)
```bash
NODE_ENV=production
JWT_SECRET=your-super-secret-32-character-key
JWT_EXPIRES_IN=7d
DATABASE_URL=postgresql://user:password@host:port/database
```

### Frontend Configuration
The API service automatically switches between development and production URLs:
- Development: `http://localhost:3000/api`
- Production: `https://todoapp-2zsx.onrender.com/api`

## 🔒 **Security Features**

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Security headers with Helmet
- SQL injection prevention with Sequelize ORM

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 **License**

This project is licensed under the MIT License.

## 🙏 **Acknowledgments**

- React Native community for excellent documentation
- MobX team for reactive state management
- Express.js for the robust backend framework
- PostgreSQL for reliable data persistence

## 📋 **Quick Screenshot Checklist**

To complete the README documentation, capture these screenshots:

- [ ] **ios-login.png** - Login screen with email/password fields
- [ ] **ios-signup.png** - Signup screen with registration form
- [ ] **ios-todos.png** - Main todo list with several todos
- [ ] **ios-add-todo.png** - Add/edit todo screen
- [ ] **ios-profile.png** - User profile management screen
- [ ] **ios-dark-mode.png** - App in dark mode
- [ ] **feature-auth.gif** - Login/signup flow demonstration
- [ ] **feature-crud.gif** - Adding, editing, completing, deleting todos
- [ ] **feature-theme.gif** - Switching between light and dark themes
- [ ] **api-postman.png** - Backend API testing in Postman

**Tip**: Use `Cmd + S` in iOS Simulator to quickly save screenshots!

---

**Built with ❤️ for modern full-stack development**
