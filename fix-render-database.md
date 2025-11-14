# 🚨 URGENT: Fix Render Database Connection

## Your Error:
```
Error: connect ECONNREFUSED ::1:5432
Unable to start server: ConnectionRefusedError [SequelizeConnectionRefusedError]
```

## 🔧 **IMMEDIATE FIX STEPS:**

### 1. Create PostgreSQL Database (If Not Done)
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "PostgreSQL"
3. Name: `todo-postgres`
4. Plan: Free
5. **WAIT** for it to show "Available" status

### 2. Get the Database URL
1. Click on your PostgreSQL database
2. Scroll down to "Connections"
3. **Copy the "External Database URL"** (should look like):
   ```
   postgresql://todo_user_abc:xyz123@dpg-abc123.oregon-postgres.render.com:5432/todo_postgres_def
   ```

### 3. Update Your Web Service
1. Go to your Web Service (todo-backend)
2. Click "Environment" tab
3. **Add or update these variables:**
   ```
   NODE_ENV=production
   JWT_SECRET=your-super-secret-32-character-key-here
   JWT_EXPIRES_IN=7d
   DATABASE_URL=[paste-the-external-database-url-here]
   ```

### 4. Redeploy
1. Click "Manual Deploy" → "Deploy latest commit"
2. Wait for deployment to complete

## ⚠️ **CRITICAL POINTS:**

- **Use EXTERNAL Database URL, not Internal**
- **Make sure DATABASE_URL has no extra spaces**
- **The database must be "Available" before connecting**

## 🧪 **Test After Fix:**
Once deployed, test with:
```bash
curl https://your-app-name.onrender.com/api/health
```

Should return:
```json
{"status":"OK","message":"Todo API is running"}
```

## 🆘 **Still Having Issues?**

### Alternative: Use Railway (Easier Database Setup)
```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Railway automatically handles database connections and is often more reliable for beginners.

---

**The key issue is that your DATABASE_URL environment variable is not set correctly in Render. Follow steps 1-4 above to fix it.**
