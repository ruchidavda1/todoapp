# 🚀 Quick Start Guide

## 📱 **Test the Live App**

The backend is already deployed and running at:
**https://todoapp-2zsx.onrender.com/api**

## ⚡ **Option 1: Test Frontend with Live Backend (Fastest)**

1. **Navigate to frontend**
   ```bash
   cd frontend/TodoApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start React Native**
   ```bash
   # For iOS
   npx react-native run-ios
   
   # For Android  
   npx react-native run-android
   ```

4. **The app will automatically connect to the live backend!**

## 🐳 **Option 2: Full Local Development**

1. **Start everything with Docker**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Backend API: http://localhost:3000
   - Health check: http://localhost:3000/api/health

## 🧪 **Test the API**

```bash
# Test health endpoint
curl https://todoapp-2zsx.onrender.com/api/health

# Create a user (example)
curl -X POST https://todoapp-2zsx.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "firstName": "Test",
    "lastName": "User"
  }'
```

## 📱 **Mobile App Features**

Once you run the React Native app, you can:

1. **Test API Connection** - Tap the "Test API Connection" button
2. **Sign Up** - Create a new account
3. **Login** - Use your credentials to login
4. **Create Todos** - Add new todo items
5. **Manage Todos** - Mark complete, edit, delete
6. **Switch Themes** - Toggle between light and dark mode
7. **Profile Management** - Update your profile information

## 🎯 **What's Included**

- ✅ **Complete Authentication System**
- ✅ **Full Todo CRUD Operations** 
- ✅ **Modern React Native UI**
- ✅ **MobX State Management**
- ✅ **Theme Switching**
- ✅ **Navigation System**
- ✅ **Live Backend API**
- ✅ **PostgreSQL Database**
- ✅ **Docker Support**

## 🔧 **Troubleshooting**

### React Native Issues
```bash
# Reset Metro cache
npx react-native start --reset-cache

# Clean build (iOS)
cd ios && xcodebuild clean && cd ..

# Clean build (Android)
cd android && ./gradlew clean && cd ..
```

### Backend Issues
```bash
# Check backend logs
docker-compose logs backend

# Restart services
docker-compose restart
```

---

**🎉 Your full-stack Todo app is ready to use!**
