# 🚀 Deployment Guide - Full-Stack Todo App

## Overview
This guide covers deploying your React Native + Node.js Todo application to production.

## 🎯 Deployment Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Native  │    │   Node.js API   │    │   PostgreSQL    │
│   Mobile App    │───▶│   (Render)      │───▶│   Database      │
│                 │    │                 │    │   (Render)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📋 Pre-Deployment Checklist

- [ ] Backend tests passing
- [ ] Environment variables configured
- [ ] Database schema ready
- [ ] Docker configuration tested
- [ ] GitHub repository ready
- [ ] Render account created

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Your Repository

1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

### Step 2: Deploy to Render

1. **Go to [Render Dashboard](https://dashboard.render.com)**
2. **Click "New +" → "Blueprint"**
3. **Connect your GitHub repository**
4. **Use the provided `render.yaml` configuration**

### Step 3: Manual Deployment (Alternative)

If you prefer manual setup:

1. **Create PostgreSQL Database**:
   - Go to Render Dashboard
   - Click "New +" → "PostgreSQL"
   - Name: `todo-postgres`
   - Plan: Free
   - Copy the connection string

2. **Create Web Service**:
   - Click "New +" → "Web Service"
   - Connect GitHub repository
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables:
     ```
     NODE_ENV=production
     JWT_SECRET=[generate-32-char-secret]
     JWT_EXPIRES_IN=7d
     DATABASE_URL=[your-postgres-connection-string]
     ```

### Step 4: Environment Variables

Set these in Render dashboard:

```bash
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=7d
DATABASE_URL=postgresql://username:password@hostname:port/database
```

## 📱 Frontend Configuration

### Update API URL for Production

1. **Edit `frontend/TodoApp/src/services/api.ts`**:
   ```typescript
   const BASE_URL = __DEV__ 
     ? 'http://localhost:3000/api'
     : 'https://your-app-name.onrender.com/api';
   ```

2. **For iOS Simulator** (development):
   ```typescript
   const BASE_URL = __DEV__ 
     ? Platform.OS === 'ios' 
       ? 'http://localhost:3000/api'
       : 'http://10.0.2.2:3000/api'  // Android emulator
     : 'https://your-app-name.onrender.com/api';
   ```

## 🔄 CI/CD Pipeline

The included GitHub Actions workflow will:
- ✅ Run tests on every push
- ✅ Deploy to Render on main branch
- ✅ Notify on deployment status

### Manual Trigger
```bash
git push origin main
```

## 🐳 Docker Deployment (Alternative)

### Local Docker Testing
```bash
# Test production build locally
docker-compose -f docker-compose.prod.yml up --build

# Check health
curl http://localhost:3000/api/health
```

### Deploy to Docker-based platforms (Railway, Fly.io)

1. **Railway**:
   ```bash
   npm install -g @railway/cli
   railway login
   railway init
   railway up
   ```

2. **Fly.io**:
   ```bash
   flyctl launch
   flyctl deploy
   ```

## 📊 Monitoring & Health Checks

### Health Check Endpoint
```
GET https://your-app-name.onrender.com/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Todo API is running"
}
```

### Monitor Logs
```bash
# Render logs (via dashboard)
# Or use Render CLI
render logs --service your-service-name
```

## 🔒 Security Checklist

- [ ] JWT secret is secure (32+ characters)
- [ ] Database credentials are not in code
- [ ] CORS is properly configured
- [ ] Helmet security headers enabled
- [ ] Environment variables set correctly
- [ ] No sensitive data in logs

## 🧪 Testing Deployment

### Backend API Tests
```bash
# Health check
curl https://your-app-name.onrender.com/api/health

# Test signup
curl -X POST https://your-app-name.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Test login
curl -X POST https://your-app-name.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Frontend Testing
1. Update API URL in your app
2. Build and test on device/simulator
3. Verify authentication flow
4. Test CRUD operations

## 📱 Mobile App Distribution

### iOS (App Store)
1. **Build for release**:
   ```bash
   cd frontend/TodoApp
   npx react-native run-ios --configuration Release
   ```

2. **Archive in Xcode**:
   - Open `ios/TodoApp.xcworkspace`
   - Product → Archive
   - Upload to App Store Connect

### Android (Google Play)
1. **Generate signed APK**:
   ```bash
   cd frontend/TodoApp/android
   ./gradlew assembleRelease
   ```

2. **Upload to Google Play Console**

## 🔧 Troubleshooting

### Common Issues

1. **Database Connection Failed**:
   - Check DATABASE_URL format
   - Verify database is running
   - Check network connectivity

2. **CORS Errors**:
   - Update ALLOWED_ORIGINS
   - Check frontend API URL

3. **JWT Errors**:
   - Verify JWT_SECRET length (32+ chars)
   - Check token expiration

4. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies installed
   - Review build logs

### Debug Commands
```bash
# Check environment variables
echo $DATABASE_URL

# Test database connection
psql $DATABASE_URL

# Check app logs
npm run dev  # Local testing
```

## 🎉 Success Criteria

Your deployment is successful when:
- [ ] Backend health check returns 200 OK
- [ ] Database connection established
- [ ] Authentication endpoints working
- [ ] CRUD operations functional
- [ ] Mobile app connects to production API
- [ ] CI/CD pipeline passing

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **React Native Docs**: https://reactnative.dev/docs/getting-started
- **PostgreSQL Docs**: https://www.postgresql.org/docs/

---

**🚀 Your Todo app is now ready for production!**

Backend URL: `https://your-app-name.onrender.com`
Health Check: `https://your-app-name.onrender.com/api/health`
