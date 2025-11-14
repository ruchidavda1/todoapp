# Full-Stack Todo Application

A complete full-stack mobile Todo application built with React Native frontend and Node.js backend, featuring authentication, CRUD operations, and modern UI/UX design.

## 🚀 Features

### Frontend (React Native)
- **Authentication**: Sign up and login screens with form validation
- **Todo Management**: Create, read, update, delete todos
- **Modern UI**: Clean, responsive design with smooth animations
- **Dark Theme**: Toggle between light and dark themes
- **State Management**: MobX for reactive state management
- **Navigation**: React Navigation with stack and tab navigators
- **Priority System**: Low, medium, high priority todos
- **Search & Filter**: Search todos and filter by completion status
- **Profile Management**: Update user profile information

### Backend (Node.js + Express)
- **RESTful APIs**: Complete CRUD operations for todos and authentication
- **JWT Authentication**: Secure token-based authentication
- **PostgreSQL Database**: Robust data persistence with Sequelize ORM
- **Input Validation**: Comprehensive validation and error handling
- **Security**: Helmet, CORS, and bcrypt for password hashing
- **Middleware**: Authentication middleware for protected routes
- **Docker Support**: Containerized application for easy deployment

## 🛠 Tech Stack

### Frontend
- **React Native** 0.82.1
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
- **ESLint** & Prettier for code quality

## 📁 Project Structure

```
todo-app/
├── backend/                 # Node.js backend
│   ├── middleware/         # Authentication middleware
│   ├── models/            # Sequelize models
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   ├── Dockerfile         # Docker configuration
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
│       ├── App.tsx           # Main app component
│       └── package.json      # Frontend dependencies
├── docker-compose.yml        # Development setup
├── docker-compose.prod.yml   # Production setup
└── README.md                # This file
```

## 🚦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- React Native development environment
- Docker & Docker Compose (optional)

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd todo-app
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

3. **Set up PostgreSQL database**
   ```bash
   # Create database
   createdb todo_app
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your database credentials
   ```

5. **Start the server**
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

4. **Update API URL**
   - Edit `src/services/api.ts`
   - Change `BASE_URL` to your backend URL

5. **Start the React Native app**
   ```bash
   # iOS
   npx react-native run-ios
   
   # Android
   npx react-native run-android
   ```

## 🔧 API Endpoints

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

## 🎨 Features Showcase

### Authentication Flow
- Clean, modern login and signup screens
- Form validation with error handling
- Secure JWT token storage
- Automatic token refresh handling

### Todo Management
- Intuitive todo creation with priority levels
- Inline editing and deletion
- Completion status toggle
- Search and filtering capabilities
- Bulk operations (delete all completed)

### User Experience
- Smooth navigation with React Navigation
- Pull-to-refresh functionality
- Loading states and error handling
- Responsive design for different screen sizes
- Dark/light theme toggle

## 🐳 Docker Commands

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

## 🧪 Testing

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

## 🚀 Deployment

### Quick Deployment Guide

1. **Run the deployment script:**
   ```bash
   ./deploy.sh
   ```

2. **Deploy to Render (Recommended):**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Use the included `render.yaml` configuration

3. **Verify deployment:**
   ```bash
   node verify-deployment.js https://your-app-name.onrender.com/api
   ```

### Detailed Deployment Instructions

See [DEPLOYMENT.md](DEPLOYMENT.md) for comprehensive deployment guide including:
- Backend deployment to Render/Railway/Heroku
- Frontend configuration for production
- CI/CD pipeline setup
- Environment variables configuration
- Testing and verification steps

### Environment Variables (Production)

```bash
NODE_ENV=production
JWT_SECRET=your-super-secret-32-character-key
JWT_EXPIRES_IN=7d
DATABASE_URL=postgresql://user:password@host:port/database
```

### Frontend Configuration

Update the API URL in `frontend/TodoApp/src/services/api.ts`:
```typescript
const BASE_URL = __DEV__ 
  ? 'http://localhost:3000/api'
  : 'https://your-app-name.onrender.com/api';
```

## 🔒 Security Features

- JWT token authentication
- Password hashing with bcrypt
- Input validation and sanitization
- CORS protection
- Security headers with Helmet
- SQL injection prevention with Sequelize ORM

## 📱 Screenshots

*Add screenshots of your app here*

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Native community for excellent documentation
- MobX team for reactive state management
- Express.js for the robust backend framework
- PostgreSQL for reliable data persistence

## 📞 Support

If you have any questions or run into issues, please:
1. Check the existing issues
2. Create a new issue with detailed information
3. Include steps to reproduce the problem

---

**Built with ❤️ for the Full-Stack Developer Challenge**
