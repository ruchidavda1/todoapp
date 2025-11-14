# 🔧 How to Set Environment Variables in Render

## 📍 **Step-by-Step Guide with Screenshots**

### **Step 1: Go to Render Dashboard**
1. Open your browser and go to: **https://dashboard.render.com**
2. Log in to your account

### **Step 2: Find Your Web Service**
1. You should see your services listed on the dashboard
2. Look for your backend service (probably named something like `todo-backend` or similar)
3. **Click on your backend service name**

### **Step 3: Navigate to Environment Tab**
Once you're in your service dashboard, you'll see several tabs at the top:
- Overview
- **Environment** ← Click this one
- Settings
- Logs
- etc.

**Click on the "Environment" tab**

### **Step 4: Add Environment Variables**
In the Environment tab, you'll see:
- A section called "Environment Variables"
- An "Add Environment Variable" button or similar

**For each variable, you need to add:**

#### **Variable 1: NODE_ENV**
- **Key:** `NODE_ENV`
- **Value:** `production`

#### **Variable 2: JWT_SECRET**
- **Key:** `JWT_SECRET`
- **Value:** `your-super-secret-32-character-key-here-change-this`

#### **Variable 3: JWT_EXPIRES_IN**
- **Key:** `JWT_EXPIRES_IN`
- **Value:** `7d`

#### **Variable 4: DATABASE_URL** (Most Important!)
- **Key:** `DATABASE_URL`
- **Value:** `postgresql://username:password@hostname:port/database`

### **Step 5: Get Your Database URL**
If you haven't created a PostgreSQL database yet:

1. **Go back to main dashboard**
2. **Click "New +" → "PostgreSQL"**
3. **Name:** `todo-postgres`
4. **Plan:** Free
5. **Wait for it to be created**
6. **Click on your database**
7. **Scroll down to find "External Database URL"**
8. **Copy this URL** (it looks like):
   ```
   postgresql://todo_user_abc:xyz123password@dpg-abc123.oregon-postgres.render.com:5432/todo_postgres_def
   ```

### **Step 6: Save and Deploy**
1. After adding all environment variables
2. **Click "Save" or "Update"**
3. **Go back to your web service**
4. **Click "Manual Deploy"**
5. **Select "Deploy latest commit"**

## 🖼️ **Visual Guide - What to Look For:**

### **Dashboard Layout:**
```
┌─────────────────────────────────────────┐
│ Render Dashboard                        │
├─────────────────────────────────────────┤
│ Services:                               │
│ ┌─────────────────┐ ┌─────────────────┐ │
│ │   todo-backend  │ │  todo-postgres  │ │
│ │   Web Service   │ │   PostgreSQL    │ │
│ └─────────────────┘ └─────────────────┘ │
└─────────────────────────────────────────┘
```

### **Service Dashboard Tabs:**
```
┌─────────────────────────────────────────┐
│ todo-backend                            │
├─────────────────────────────────────────┤
│ Overview | Environment | Settings | ... │
│          ^^^^^^^^^^^^                   │
│          Click here!                    │
└─────────────────────────────────────────┘
```

### **Environment Variables Section:**
```
┌─────────────────────────────────────────┐
│ Environment Variables                   │
├─────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────────────┐ │
│ │ Key         │ │ Value               │ │
│ ├─────────────┤ ├─────────────────────┤ │
│ │ NODE_ENV    │ │ production          │ │
│ │ JWT_SECRET  │ │ your-secret-key     │ │
│ │ DATABASE_URL│ │ postgresql://...    │ │
│ └─────────────┘ └─────────────────────┘ │
│                                         │
│ [+ Add Environment Variable]            │
└─────────────────────────────────────────┘
```

## 🚨 **Can't Find Environment Tab?**

### **Alternative Locations:**
1. **Settings Tab** - Sometimes environment variables are under "Settings"
2. **Configuration** - Look for a "Configuration" or "Config" section
3. **Deploy** - Some services have environment variables in the deploy section

### **If You Still Can't Find It:**
1. **Look for any tab with "Config", "Env", or "Variables" in the name**
2. **Check the left sidebar** - sometimes it's in a sidebar menu
3. **Look for a gear icon** ⚙️ - often represents settings/environment

## 🔍 **Troubleshooting:**

### **Problem: No Environment Tab**
- Make sure you clicked on your **Web Service** (not the database)
- Try refreshing the page
- Look in Settings tab instead

### **Problem: Can't Save Variables**
- Make sure both Key and Value are filled
- Check for any error messages
- Try adding one variable at a time

### **Problem: Still Getting Database Error**
- Double-check the DATABASE_URL is exactly copied from your PostgreSQL service
- Make sure there are no extra spaces
- Verify the database shows "Available" status

## 📞 **Need More Help?**

If you still can't find the environment variables section:

1. **Take a screenshot** of your Render dashboard
2. **Look for any section mentioning "Environment", "Config", or "Variables"**
3. **Try the Render documentation**: https://render.com/docs/environment-variables

---

**The key is finding your Web Service → Environment tab → Add the 4 variables → Redeploy!**
