# 🚀 Deploy to Render + Vercel - Step-by-Step Guide

This guide will help you deploy your full-stack application:
- **Backend → Render.com** (Free tier)
- **Frontend → Vercel.com** (Free tier)
- **Database → MongoDB Atlas** (Free tier)

---

## 📋 **Prerequisites**

Before you start, make sure you have:
1. GitHub account
2. Your code pushed to a GitHub repository
3. Accounts created on:
   - [Render.com](https://render.com)
   - [Vercel.com](https://vercel.com)
   - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

---

## 🗄️ **STEP 1: Setup MongoDB Atlas (Database)**

### 1.1 Create Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up/Login
3. Click **"Build a Database"**
4. Choose **FREE** tier (M0)
5. Select a cloud provider & region (choose closest to you)
6. Cluster Name: `care4u` (or any name)
7. Click **"Create"**

### 1.2 Create Database User
1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **Password** authentication
4. Username: `care4u_user`
5. Password: Generate a secure password (save it!)
6. User Privileges: **Read and write to any database**
7. Click **"Add User"**

### 1.3 Setup Network Access
1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for development)
4. IP: `0.0.0.0/0`
5. Click **"Confirm"**

### 1.4 Get Connection String
1. Go to **Database** → Click **"Connect"**
2. Choose **"Connect your application"**
3. Driver: **Python**, Version: **3.11 or later**
4. Copy the connection string, it looks like:
   ```
   mongodb+srv://care4u_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Save this connection string - you'll need it for Render!

---

## 🖥️ **STEP 2: Deploy Backend to Render**

### 2.1 Push Code to GitHub
```bash
# Initialize git (if not already)
cd C:\Users\advik\OneDrive\Desktop\Health
git init
git add .
git commit -m "Initial commit for deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2.2 Deploy on Render
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**

3. **Connect Repository:**
   - Click **"Connect GitHub"**
   - Authorize Render to access your repositories
   - Select your repository

4. **Configure Service:**
   - **Name:** `care4u-backend`
   - **Region:** Oregon (or closest to you)
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python main.py`
   - **Plan:** `Free`

5. **Environment Variables** - Click "Add Environment Variable" for each:
   ```
   SECRET_KEY = your-random-secret-key-here-make-it-long-and-random
   MONGODB_URI = mongodb+srv://care4u_user:<password>@cluster0.xxxxx.mongodb.net/care4u?retryWrites=true&w=majority
   MONGODB_DB = care4u
   DEBUG = False
   HOST = 0.0.0.0
   PORT = 10000
   AI_TIMEOUT = 30
   AI_MAX_RETRIES = 3
   AI_FALLBACK_ENABLED = true
   ENABLE_AI_CHAT = true
   ENABLE_SYMPTOM_CHECKER = true
   ENABLE_CARE_PLANS = true
   ```

   **Optional (if you have API keys):**
   ```
   OPENAI_API_KEY = sk-your-openai-key-here
   ANTHROPIC_API_KEY = sk-ant-your-anthropic-key-here
   ```

6. Click **"Create Web Service"**
7. Wait 5-10 minutes for deployment
8. Your backend will be live at: `https://care4u-backend.onrender.com`
9. **SAVE THIS URL!** You'll need it for frontend

### 2.3 Test Backend
Visit: `https://care4u-backend.onrender.com/api/health` (should return status)

---

## 🎨 **STEP 3: Deploy Frontend to Vercel**

### 3.1 Update Frontend API URL
Before deploying, update the frontend to use your Render backend URL:

1. Create a `.env` file in the `frontend` folder:
```bash
# frontend/.env
VITE_API_URL=https://care4u-backend.onrender.com/api
```

2. Update your axios configuration to use this env variable.

### 3.2 Deploy on Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**

3. **Import Repository:**
   - Click **"Import Git Repository"**
   - Connect your GitHub account
   - Select your repository
   - Click **"Import"**

4. **Configure Project:**
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend` (click Edit and select)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `dist` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

5. **Environment Variables:**
   Click "Add" and enter:
   ```
   Name: VITE_API_URL
   Value: https://care4u-backend.onrender.com/api
   ```

6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment
8. Your frontend will be live at: `https://your-project-name.vercel.app`

### 3.3 Update CORS Settings
Your backend needs to allow requests from your Vercel domain.

Update `backend/config.py` or wherever CORS is configured to include your Vercel URL:
```python
CORS_ORIGINS = [
    'http://localhost:3000',
    'https://your-project-name.vercel.app'
]
```

Then commit and push the changes - Render will auto-redeploy!

---

## ✅ **STEP 4: Verify Deployment**

### Test Full Stack:
1. Visit your Vercel URL: `https://your-project-name.vercel.app`
2. Try to register/login
3. Test video consultation
4. Test AI chat features

### Check Logs:
- **Render Backend Logs:** Go to your service → "Logs" tab
- **Vercel Logs:** Go to your deployment → "Functions" or "Logs" tab
- **MongoDB:** Database → "Metrics" to see connections

---

## 🔧 **STEP 5: Common Issues & Fixes**

### Issue 1: CORS Errors
**Solution:** Add your Vercel domain to CORS origins in backend

### Issue 2: Backend Not Responding
**Solution:** Check Render logs - might be MongoDB connection issue

### Issue 3: Environment Variables Not Working
**Solution:** Make sure to use `VITE_` prefix for Vite environment variables

### Issue 4: Render Free Tier Sleep
**Note:** Free tier on Render sleeps after 15 min of inactivity. First request will take ~30 seconds to wake up.

---

## 📱 **Your Live URLs**

After deployment, you'll have:
- **Frontend:** `https://your-project-name.vercel.app`
- **Backend:** `https://care4u-backend.onrender.com`
- **Database:** MongoDB Atlas (managed)

---

## 🔄 **Auto-Deploy (CI/CD)**

Both platforms auto-deploy when you push to GitHub:
- Push to `main` branch → Auto-deploys!
- No manual deployment needed after initial setup

---

## 💡 **Tips**

1. **Custom Domain:** Both Render and Vercel support custom domains (free)
2. **Environment Variables:** Never commit `.env` files to GitHub
3. **Monitoring:** Use Render and Vercel dashboards to monitor usage
4. **Free Tier Limits:**
   - Render: 750 hours/month, sleeps after 15 min inactivity
   - Vercel: Unlimited deployments, 100GB bandwidth
   - MongoDB Atlas: 512MB storage

---

## 📞 **Need Help?**

- **Render Docs:** https://render.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **MongoDB Docs:** https://docs.atlas.mongodb.com/

---

## 🎉 **Congratulations!**

Your full-stack application is now live and accessible from anywhere in the world!

Share your live URL with friends, add it to your portfolio, or use it in your hackathon demo!
