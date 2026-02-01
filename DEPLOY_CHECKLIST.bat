@echo off
echo ============================================
echo   RENDER + VERCEL DEPLOYMENT CHECKLIST
echo ============================================
echo.
echo STEP 1: MONGODB ATLAS
echo [ ] Create free MongoDB Atlas account
echo [ ] Create cluster (M0 Free tier)
echo [ ] Create database user with password
echo [ ] Whitelist IP: 0.0.0.0/0
echo [ ] Copy connection string
echo.
echo STEP 2: PUSH TO GITHUB
echo [ ] Create GitHub repository
echo [ ] Run: git init
echo [ ] Run: git add .
echo [ ] Run: git commit -m "Initial commit"
echo [ ] Run: git remote add origin YOUR_REPO_URL
echo [ ] Run: git push -u origin main
echo.
echo STEP 3: RENDER BACKEND
echo [ ] Go to render.com
echo [ ] New Web Service
echo [ ] Connect GitHub repo
echo [ ] Root Directory: backend
echo [ ] Build: pip install -r requirements.txt
echo [ ] Start: python main.py
echo [ ] Add environment variables (see DEPLOY_GUIDE.md)
echo [ ] Deploy and copy URL
echo.
echo STEP 4: VERCEL FRONTEND
echo [ ] Create frontend/.env with VITE_API_URL
echo [ ] Go to vercel.com
echo [ ] New Project
echo [ ] Import GitHub repo
echo [ ] Root Directory: frontend
echo [ ] Framework: Vite
echo [ ] Add VITE_API_URL environment variable
echo [ ] Deploy
echo.
echo STEP 5: TEST
echo [ ] Visit Vercel URL
echo [ ] Test registration/login
echo [ ] Test video consultation
echo [ ] Test AI features
echo.
echo ============================================
echo See DEPLOY_GUIDE.md for detailed instructions
echo ============================================
pause
