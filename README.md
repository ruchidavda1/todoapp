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







**Built with ❤️ for the Full-Stack Developer Challenge**
