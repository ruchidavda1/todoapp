# Todo App - Complete Documentation

## Table of Contents
1. [Quick Setup](#quick-setup)
2. [Architecture Overview](#architecture-overview)
3. [API Reference](#api-reference)
4. [Development Guide](#development-guide)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

---

## Quick Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- React Native CLI
- Xcode (iOS) / Android Studio (Android)

### Installation
```bash
# Clone and install
git clone https://github.com/ruchidavda1/todoapp.git
cd todoapp
npm run install-all

# Setup database
createdb todoapp_dev

# Configure environment
cp backend/.env.example backend/.env
# Edit backend/.env with your database credentials

# Start development
npm run dev                    # Backend
cd frontend/TodoApp && npx react-native run-ios  # Frontend
```

---

## Architecture Overview

### System Design
```
React Native App ←→ Node.js API ←→ PostgreSQL Database
     (MobX)         (Express.js)      (Sequelize ORM)
```

### Tech Stack
- **Frontend**: React Native, MobX, TypeScript, React Navigation
- **Backend**: Node.js, Express.js, Sequelize, JWT, bcrypt
- **Database**: PostgreSQL
- **DevOps**: Docker, GitHub Actions, Render.com

### Project Structure
```
todoapp/
├── frontend/TodoApp/           # React Native application
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── screens/           # Screen components
│   │   ├── stores/            # MobX state management
│   │   ├── services/          # API services
│   │   ├── navigation/        # Navigation setup
│   │   └── types/             # TypeScript definitions
│   ├── ios/                   # iOS-specific files
│   ├── android/               # Android-specific files
│   └── App.tsx                # Root component
├── backend/                   # Node.js API server
│   ├── middleware/            # Express middleware
│   ├── models/                # Database models
│   ├── routes/                # API routes
│   ├── controllers/           # Business logic
│   └── server.js              # Main server file
├── .github/workflows/         # CI/CD pipelines
└── docker-compose.yml         # Docker configuration
```

### State Management (MobX)
```typescript
// AuthStore - User authentication
class AuthStore {
  @observable user: User | null = null;
  @observable isAuthenticated = false;
  
  @action login = async (credentials) => { ... }
  @action logout = async () => { ... }
}

// TodoStore - Todo management
class TodoStore {
  @observable todos: Todo[] = [];
  @observable filter: 'all' | 'active' | 'completed' = 'all';
  
  @action fetchTodos = async () => { ... }
  @action addTodo = async (todo) => { ... }
  @action toggleTodo = async (id) => { ... }
}

// ThemeStore - Dark/Light theme
class ThemeStore {
  @observable theme: 'light' | 'dark' = 'light';
  
  @action toggleTheme = () => { ... }
  @computed get colors() { ... }
}
```

---

## API Reference

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://todoapp-2zsx.onrender.com/api`

### Authentication

#### POST /auth/signup
```json
// Request
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

// Response (201)
{
  "message": "User created successfully",
  "user": { "id": 1, "email": "user@example.com", ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### POST /auth/login
```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response (200)
{
  "message": "Login successful",
  "user": { "id": 1, "email": "user@example.com", ... },
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

#### GET /auth/profile
```bash
# Headers: Authorization: Bearer <token>
# Response (200)
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```

### Todos

#### GET /todos
```bash
# Query params: ?page=1&limit=10&completed=false&priority=high&search=meeting
# Headers: Authorization: Bearer <token>

# Response (200)
{
  "todos": [
    {
      "id": 1,
      "title": "Complete project",
      "description": "Finish the todo app",
      "completed": false,
      "priority": "high",
      "dueDate": "2025-01-15T00:00:00.000Z",
      "createdAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 3,
    "totalItems": 25
  }
}
```

#### POST /todos
```json
// Request
{
  "title": "New Task",
  "description": "Task description",
  "priority": "medium",
  "dueDate": "2025-01-20T00:00:00.000Z"
}

// Response (201)
{
  "message": "Todo created successfully",
  "todo": { "id": 2, "title": "New Task", ... }
}
```

#### PUT /todos/:id
```json
// Request
{
  "title": "Updated Task",
  "completed": true,
  "priority": "low"
}

// Response (200)
{
  "message": "Todo updated successfully",
  "todo": { "id": 1, "title": "Updated Task", ... }
}
```

#### PATCH /todos/:id/toggle
```json
// Response (200)
{
  "message": "Todo status updated",
  "todo": { "id": 1, "completed": true }
}
```

#### DELETE /todos/:id
```json
// Response (200)
{
  "message": "Todo deleted successfully"
}
```

#### DELETE /todos/completed/all
```json
// Response (200)
{
  "message": "All completed todos deleted",
  "deletedCount": 5
}
```

### Error Responses
```json
// 400 Bad Request
{
  "error": "Validation failed",
  "details": [
    { "field": "email", "message": "Email is required" }
  ]
}

// 401 Unauthorized
{
  "error": "Unauthorized",
  "message": "Invalid or missing token"
}

// 404 Not Found
{
  "error": "Not found",
  "message": "Todo not found"
}
```

---

## Development Guide

### Environment Setup

#### Backend Environment (.env)
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todoapp_dev
DB_USER=your_username
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Server
PORT=3000
NODE_ENV=development
```

### Database Setup
```sql
-- Create database and user
CREATE DATABASE todoapp_dev;
CREATE USER todoapp_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE todoapp_dev TO todoapp_user;

-- Tables are auto-created by Sequelize on first run
```

### Development Workflow
```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: React Native Metro
cd frontend/TodoApp
npx react-native start

# Terminal 3: iOS Simulator
npx react-native run-ios --simulator="iPhone 16 Pro"

# Terminal 4: Android Emulator (optional)
npx react-native run-android
```

### Key Commands
```bash
# Install all dependencies
npm run install-all

# Start backend only
npm run dev

# Reset React Native cache
cd frontend/TodoApp && npx react-native start --reset-cache

# Clean iOS build
cd frontend/TodoApp/ios && xcodebuild clean

# Run tests
cd backend && npm test
```

### Code Structure Guidelines

#### React Native Components
```typescript
// Screen Component
const TodoListScreen = observer(() => {
  const { todoStore, authStore } = useStores();
  
  useEffect(() => {
    todoStore.fetchTodos();
  }, []);
  
  return (
    <SafeAreaView style={styles.container}>
      <TodoList todos={todoStore.filteredTodos} />
      <AddTodoButton onPress={() => navigation.navigate('AddTodo')} />
    </SafeAreaView>
  );
});

// Reusable Component
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <TouchableOpacity style={styles.item}>
      <Text style={[styles.title, todo.completed && styles.completed]}>
        {todo.title}
      </Text>
    </TouchableOpacity>
  );
};
```

#### Backend Controllers
```javascript
// Controller Pattern
const todoController = {
  async getAllTodos(req, res, next) {
    try {
      const { page = 1, limit = 10, completed, priority, search } = req.query;
      const userId = req.user.id;
      
      const whereClause = { userId };
      if (completed !== undefined) whereClause.completed = completed === 'true';
      if (priority) whereClause.priority = priority;
      if (search) {
        whereClause[Op.or] = [
          { title: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } }
        ];
      }
      
      const todos = await Todo.findAndCountAll({
        where: whereClause,
        limit: parseInt(limit),
        offset: (parseInt(page) - 1) * parseInt(limit),
        order: [['createdAt', 'DESC']]
      });
      
      res.json({
        todos: todos.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(todos.count / parseInt(limit)),
          totalItems: todos.count
        }
      });
    } catch (error) {
      next(error);
    }
  }
};
```

---

## Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up --build

# Production deployment
docker-compose -f docker-compose.prod.yml up -d
```

### Render.com Deployment
1. Connect GitHub repository to Render
2. Configure environment variables
3. Deploy automatically on push to main branch

### Environment Variables (Production)
```env
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=production-secret-key
NODE_ENV=production
PORT=3000
```

### CI/CD Pipeline (GitHub Actions)
```yaml
name: Deploy to Render
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Install dependencies
        run: cd backend && npm ci
      - name: Run tests
        run: cd backend && npm test
      - name: Deploy to Render
        run: curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

---

## Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Kill processes on ports
lsof -ti:3000 | xargs kill -9  # Backend
lsof -ti:8081 | xargs kill -9  # Metro
```

#### 2. Database Connection Failed
```bash
# Check PostgreSQL status
brew services list | grep postgresql
brew services restart postgresql

# Test connection
psql -h localhost -U todoapp_user -d todoapp_dev
```

#### 3. React Native Build Errors
```bash
# Clean everything
cd frontend/TodoApp
npx react-native start --reset-cache
cd ios && xcodebuild clean && cd ..
cd android && ./gradlew clean && cd ..

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# iOS specific
cd ios && pod deintegrate && pod install && cd ..
```

#### 4. Metro Bundler Issues
```bash
# Reset Metro cache
npx react-native start --reset-cache

# Clear watchman
watchman watch-del-all

# Kill Metro processes
pkill -f "node.*metro"
```

#### 5. Xcode Build Database Locked
```bash
# Kill Xcode processes
pkill -f Xcode

# Clean DerivedData
rm -rf ~/Library/Developer/Xcode/DerivedData/*
```

### Error Messages

#### `Unable to resolve module @babel/runtime`
```bash
cd frontend/TodoApp
rm -rf node_modules package-lock.json
npm install
npx react-native start --reset-cache
```

#### `configs.toReversed is not a function`
- Update Node.js to version 18+
- Or modify metro.config.js to avoid the issue

#### `Database connection refused`
- Ensure PostgreSQL is running
- Check database credentials in .env
- Verify database exists

#### `JWT token expired`
- Clear app storage/cache
- Re-login to get new token

### Performance Issues

#### Slow API responses
- Check database indexes
- Optimize queries
- Enable response compression

#### React Native performance
- Use React.memo for expensive components
- Implement lazy loading
- Optimize images and assets

#### Memory leaks
- Properly cleanup subscriptions
- Use MobX reactions correctly
- Monitor component re-renders

---

## Security Considerations

### Authentication
- JWT tokens with expiration
- Password hashing with bcrypt
- Secure token storage in AsyncStorage

### API Security
- Input validation with Joi
- SQL injection prevention with Sequelize
- Rate limiting on endpoints
- CORS configuration
- Security headers with Helmet

### Data Protection
- Environment variables for secrets
- HTTPS in production
- Database connection encryption
- Proper error handling (no sensitive data in responses)

---

## Testing

### Backend Testing
```bash
cd backend
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### API Testing with curl
```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","firstName":"Test","lastName":"User"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get todos (replace TOKEN)
curl -X GET http://localhost:3000/api/todos \
  -H "Authorization: Bearer TOKEN"
```

---

## Contributing

### Development Process
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test thoroughly
4. Commit with clear messages
5. Push and create pull request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Write tests for new features
- Update documentation
- Use conventional commit messages

### Pull Request Process
1. Ensure all tests pass
2. Update documentation if needed
3. Add screenshots for UI changes
4. Request review from maintainers

---

Built with modern full-stack development practices
