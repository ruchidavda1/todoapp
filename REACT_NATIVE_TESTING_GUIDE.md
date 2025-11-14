# 📱 React Native App Testing Guide

## 🎯 **Testing Your Todo App with Production Backend**

Your backend is live at: `https://todoapp-2zsx.onrender.com/api`  
Your frontend is configured to use this URL in production mode.

## 🚀 **Quick Start Testing**

### **Step 1: Navigate to Frontend Directory**
```bash
cd frontend/TodoApp
```

### **Step 2: Install Dependencies (if not done)**
```bash
npm install
```

### **Step 3: Install iOS Dependencies (iOS only)**
```bash
cd ios && pod install && cd ..
```

## 📱 **Testing Options**

### **Option 1: iOS Simulator (Mac only)**
```bash
# Start Metro bundler
npm start

# In another terminal, run iOS simulator
npx react-native run-ios
```

### **Option 2: Android Emulator**
```bash
# Make sure Android emulator is running
# Start Metro bundler
npm start

# In another terminal, run Android emulator
npx react-native run-android
```

### **Option 3: Physical Device**
```bash
# Start Metro bundler
npm start

# For iOS: Open Xcode and run on connected device
# For Android: Enable USB debugging and run
npx react-native run-android --device
```

## 🧪 **Testing Scenarios**

### **1. Test Authentication Flow**

#### **Sign Up Test:**
1. Open the app
2. Navigate to Sign Up screen
3. Fill in:
   - **Email:** `testuser@example.com`
   - **Password:** `password123`
   - **First Name:** `Test`
   - **Last Name:** `User`
4. Tap "Sign Up"
5. **Expected:** Success message and navigation to main screen

#### **Login Test:**
1. Navigate to Login screen
2. Fill in:
   - **Email:** `testuser@example.com`
   - **Password:** `password123`
3. Tap "Login"
4. **Expected:** Success and navigation to todo list

### **2. Test Todo Operations**

#### **Create Todo:**
1. After logging in, tap "Add Todo" or "+"
2. Fill in:
   - **Title:** `Test Todo`
   - **Description:** `This is a test todo`
   - **Priority:** `Medium`
3. Tap "Save"
4. **Expected:** Todo appears in list

#### **Update Todo:**
1. Tap on a todo item
2. Edit the title or description
3. Tap "Save"
4. **Expected:** Changes are saved and visible

#### **Complete Todo:**
1. Tap the checkbox next to a todo
2. **Expected:** Todo marked as completed

#### **Delete Todo:**
1. Swipe on todo item or tap delete button
2. **Expected:** Todo removed from list

### **3. Test Network Connectivity**

#### **Offline Behavior:**
1. Turn off WiFi/cellular
2. Try to create a todo
3. **Expected:** Error message about network connectivity

#### **Online Recovery:**
1. Turn WiFi/cellular back on
2. Try operations again
3. **Expected:** Operations work normally

## 🔍 **Debugging Tools**

### **React Native Debugger**
```bash
# Install React Native Debugger
brew install --cask react-native-debugger

# Or download from: https://github.com/jhen0409/react-native-debugger
```

### **Flipper (Meta's debugging tool)**
```bash
# Install Flipper
brew install --cask flipper

# Enable network inspector to see API calls
```

### **Chrome DevTools**
1. In simulator, press `Cmd+D` (iOS) or `Cmd+M` (Android)
2. Select "Debug"
3. Chrome will open with DevTools

## 📊 **API Testing in App**

### **Check Network Requests:**
1. Open React Native Debugger
2. Go to Network tab
3. Perform actions in app
4. **Verify API calls:**
   - `POST /api/auth/signup`
   - `POST /api/auth/login`
   - `GET /api/todos`
   - `POST /api/todos`
   - `PUT /api/todos/:id`
   - `DELETE /api/todos/:id`

### **Check API Responses:**
Look for successful responses:
- **200/201** status codes
- **Proper JSON data**
- **JWT tokens** in auth responses

## 🚨 **Common Issues & Solutions**

### **Issue 1: Metro bundler not starting**
```bash
# Clear cache and restart
npx react-native start --reset-cache
```

### **Issue 2: iOS build fails**
```bash
# Clean and rebuild
cd ios
xcodebuild clean
cd ..
npx react-native run-ios
```

### **Issue 3: Android build fails**
```bash
# Clean gradle
cd android
./gradlew clean
cd ..
npx react-native run-android
```

### **Issue 4: Network requests failing**
Check if:
- ✅ Backend is running: `https://todoapp-2zsx.onrender.com/api/health`
- ✅ API URL is correct in `src/services/api.ts`
- ✅ Device/simulator has internet connection

### **Issue 5: Authentication not working**
1. Check JWT token storage in AsyncStorage
2. Verify API responses in network debugger
3. Check if backend auth endpoints are working

## 🧪 **Manual API Testing (Backup)**

If app testing fails, test API directly:

```bash
# Test signup
curl -X POST https://todoapp-2zsx.onrender.com/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"manual@test.com","password":"test123","firstName":"Manual","lastName":"Test"}'

# Test login
curl -X POST https://todoapp-2zsx.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"manual@test.com","password":"test123"}'
```

## 📱 **Device-Specific Testing**

### **iOS Testing:**
```bash
# List available simulators
xcrun simctl list devices

# Run on specific simulator
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### **Android Testing:**
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd Pixel_4_API_30
```

## 🎯 **Success Criteria**

Your app is working correctly when:
- ✅ **Sign up creates new users**
- ✅ **Login authenticates existing users**
- ✅ **Todos can be created, read, updated, deleted**
- ✅ **Data persists between app sessions**
- ✅ **Network errors are handled gracefully**
- ✅ **UI is responsive and smooth**

## 📊 **Performance Testing**

### **Check App Performance:**
1. Monitor memory usage in Xcode/Android Studio
2. Test with large todo lists (100+ items)
3. Test rapid user interactions
4. Check for memory leaks

### **Network Performance:**
1. Test on slow network (3G simulation)
2. Monitor API response times
3. Check for proper loading states

## 🚀 **Production Testing Checklist**

- [ ] Sign up with new email works
- [ ] Login with existing credentials works
- [ ] Create todo works
- [ ] Edit todo works
- [ ] Delete todo works
- [ ] Mark todo as complete works
- [ ] App handles network errors gracefully
- [ ] Data persists after app restart
- [ ] Authentication persists after app restart
- [ ] UI is responsive on different screen sizes

---

**Your React Native app is now ready to test with the live production backend!** 🎉

**Quick Start:** `cd frontend/TodoApp && npm start && npx react-native run-ios`
