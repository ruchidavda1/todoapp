# 📋 Deployment Checklist - Todo App

## Pre-Deployment Checklist

### ✅ Code Preparation
- [ ] All features implemented and tested
- [ ] Backend tests passing (`cd backend && npm test`)
- [ ] Frontend builds without errors
- [ ] Environment variables configured
- [ ] Database schema finalized
- [ ] API endpoints documented

### ✅ Repository Setup
- [ ] Code committed to Git
- [ ] Repository pushed to GitHub
- [ ] `.env.example` file created
- [ ] `render.yaml` configuration ready
- [ ] GitHub Actions workflow configured

### ✅ Security Review
- [ ] JWT secret is secure (32+ characters)
- [ ] No sensitive data in code
- [ ] Environment variables properly set
- [ ] CORS configured correctly
- [ ] Input validation implemented

## Deployment Steps

### 🚀 Step 1: Prepare Deployment
```bash
# Run the deployment preparation script
./deploy.sh
```

### 🌐 Step 2: Backend Deployment (Render)

#### Option A: Blueprint Deployment (Recommended)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Blueprint"
3. Connect your GitHub repository
4. Render will use `render.yaml` automatically
5. Wait for deployment to complete

**Note:** If you get a "Dockerfile not found" error, the Blueprint will automatically use the Node.js buildpack instead.

#### Option B: Manual Deployment
1. **Create PostgreSQL Database:**
   - New → PostgreSQL
   - Name: `todo-postgres`
   - Plan: Free
   - Copy connection string

2. **Create Web Service:**
   - New → Web Service
   - Connect GitHub repo
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - Environment Variables:
     ```
     NODE_ENV=production
     JWT_SECRET=[generate-secure-32-char-secret]
     JWT_EXPIRES_IN=7d
     DATABASE_URL=[postgres-connection-string]
     ```

#### Option C: If Blueprint Fails (Alternative)
If you encounter Docker issues, use this manual setup:
1. Create PostgreSQL database (same as above)
2. Create Web Service with these settings:
   - **Environment:** Node
   - **Root Directory:** `backend`
   - **Build Command:** `npm install --production`
   - **Start Command:** `npm start`
   - Set all environment variables as listed above

### 📱 Step 3: Frontend Configuration

1. **Update API URL:**
   ```typescript
   // In frontend/TodoApp/src/services/api.ts
   const BASE_URL = __DEV__ 
     ? 'http://localhost:3000/api'
     : 'https://YOUR-APP-NAME.onrender.com/api';  // Replace with actual URL
   ```

2. **Test locally with production API:**
   ```bash
   cd frontend/TodoApp
   npm start
   # Test on simulator/device
   ```

### 🧪 Step 4: Verify Deployment

1. **Test API endpoints:**
   ```bash
   node verify-deployment.js https://YOUR-APP-NAME.onrender.com/api
   ```

2. **Manual testing:**
   - Health check: `https://YOUR-APP-NAME.onrender.com/api/health`
   - Test signup/login endpoints
   - Verify CRUD operations

## Post-Deployment Checklist

### ✅ Functionality Testing
- [ ] Health check endpoint responds
- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication working
- [ ] Todo CRUD operations functional
- [ ] Database persistence verified
- [ ] Error handling working

### ✅ Performance & Monitoring
- [ ] API response times acceptable
- [ ] Database queries optimized
- [ ] Error logging configured
- [ ] Health monitoring setup

### ✅ Mobile App Testing
- [ ] App connects to production API
- [ ] Authentication flow works
- [ ] All features functional on device
- [ ] Offline handling (if implemented)
- [ ] Push notifications (if implemented)

## Environment Variables Reference

### Required for Production
```bash
NODE_ENV=production
JWT_SECRET=your-super-secret-32-character-key-here
JWT_EXPIRES_IN=7d
DATABASE_URL=postgresql://username:password@hostname:port/database
```

### Optional
```bash
PORT=3000
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

## Common Issues & Solutions

### 🔧 Database Connection Issues
- **Problem:** `connection refused` or `timeout`
- **Solution:** Check DATABASE_URL format and database status

### 🔧 CORS Errors
- **Problem:** Frontend can't connect to API
- **Solution:** Update ALLOWED_ORIGINS or check API URL

### 🔧 JWT Errors
- **Problem:** Authentication failing
- **Solution:** Verify JWT_SECRET is set and consistent

### 🔧 Build Failures
- **Problem:** Deployment fails during build
- **Solution:** Check Node.js version and dependencies

## Deployment URLs

After successful deployment, update these:

- **Backend API:** `https://YOUR-APP-NAME.onrender.com`
- **Health Check:** `https://YOUR-APP-NAME.onrender.com/api/health`
- **API Documentation:** `https://YOUR-APP-NAME.onrender.com/api`

## Next Steps

### 🚀 Production Optimization
- [ ] Set up monitoring (Sentry, LogRocket)
- [ ] Configure CDN for static assets
- [ ] Implement caching strategies
- [ ] Set up backup procedures

### 📱 Mobile App Distribution
- [ ] Build production iOS app
- [ ] Build production Android app
- [ ] Submit to App Store
- [ ] Submit to Google Play Store

### 🔄 CI/CD Enhancement
- [ ] Add automated testing
- [ ] Set up staging environment
- [ ] Configure deployment notifications
- [ ] Implement rollback procedures

## Success Criteria

Your deployment is successful when:
- ✅ Health check returns 200 OK
- ✅ All API endpoints functional
- ✅ Database operations working
- ✅ Mobile app connects successfully
- ✅ Authentication flow complete
- ✅ CRUD operations verified

---

**🎉 Congratulations! Your Todo app is now deployed and ready for users!**

For detailed troubleshooting, see [DEPLOYMENT.md](DEPLOYMENT.md)
