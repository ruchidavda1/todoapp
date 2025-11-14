# 🔧 Render Deployment Fix - Database Connection Issue

## Problem
You're getting this error during Render deployment:
```
Error: connect ECONNREFUSED ::1:5432
Unable to start server: ConnectionRefusedError [SequelizeConnectionRefusedError]
```

## Root Cause
The backend is trying to connect to a local PostgreSQL database (`::1:5432`) instead of the production database. This means the `DATABASE_URL` environment variable isn't set properly in Render.

## ✅ Solution - Fix Database Connection

### Step 1: Create PostgreSQL Database First
**You MUST create the database before the web service:**

1. **Go to Render Dashboard**
2. **Create PostgreSQL Database:**
   - Click "New +" → "PostgreSQL"
   - Name: `todo-postgres`
   - Plan: Free
   - **Wait for it to be fully created**
   - Copy the **External Database URL** (not Internal)

### Step 2: Update Web Service Environment Variables
**CRITICAL:** Make sure you're using the **External Database URL**, not the Internal one.

1. **Go to your Web Service in Render Dashboard**
2. **Go to Environment tab**
3. **Add/Update these environment variables:**
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-32-character-key-here
   JWT_EXPIRES_IN=7d
   DATABASE_URL=postgresql://username:password@hostname:port/database
   ```

### Step 3: Get the Correct Database URL
1. **Go to your PostgreSQL database in Render**
2. **Copy the "External Database URL"** (it should look like):
   ```
   postgresql://todo_user_xyz:abc123@dpg-xyz.oregon-postgres.render.com:5432/todo_postgres_xyz
   ```
3. **Paste this EXACT URL as your DATABASE_URL**

### Step 4: Redeploy
- Go to your Web Service
- Click "Manual Deploy" → "Deploy latest commit"

### Option 3: Alternative Hosting Platforms

If Render continues to have issues, try these alternatives:

#### Railway (Very Easy)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

#### Heroku
```bash
# Install Heroku CLI
heroku create your-app-name
heroku addons:create heroku-postgresql:hobby-dev
git push heroku main
```

## 🧪 Test Your Deployment

Once deployed, test with:
```bash
# Replace with your actual URL
node verify-deployment.js https://your-app-name.onrender.com/api

# Or manual test
curl https://your-app-name.onrender.com/api/health
```

## 📋 Quick Deployment Steps

1. **Push your latest code:**
   ```bash
   git add .
   git commit -m "Fix deployment configuration"
   git push origin main
   ```

2. **Try Blueprint again** (should work now with root Dockerfile)

3. **If Blueprint fails, use Manual Setup** (Option 2 above)

4. **Update your frontend API URL** once deployed

## 🔍 Troubleshooting

### Still getting Dockerfile errors?
- Use Manual Setup (Option 2) - this bypasses Docker entirely
- Make sure you set **Root Directory** to `backend`

### Database connection issues?
- Check that DATABASE_URL is properly set
- Verify the PostgreSQL database is running

### Build failures?
- Check that Node.js version is 18+ in Render settings
- Verify all dependencies are in package.json

## ✅ Success Indicators

Your deployment is working when:
- Health check returns: `{"status":"OK","message":"Todo API is running"}`
- No build errors in Render logs
- Database connection established

---

**The key fix is using the Manual Setup with `backend` as the Root Directory instead of relying on Docker.**
