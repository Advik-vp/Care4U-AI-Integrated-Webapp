# CARE4U Health Platform - Quick Start Guide

## Installation & Running

### Step 1: Install Backend Dependencies

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```

### Step 2: Install Frontend Dependencies

```powershell
cd frontend
npm install
```

### Step 3: Start Backend Server

```powershell
cd backend
.\venv\Scripts\activate
python main.py
```

Backend will run on http://localhost:5000

### Step 4: Start Frontend (in a new terminal)

```powershell
cd frontend
npm start
```

Frontend will run on http://localhost:3000

## Quick Test

1. Open http://localhost:3000
2. Click "Sign Up"
3. Create a test account:
   - Username: testpatient
   - Email: test@example.com
   - Password: password123
   - Role: Patient
4. Login and explore the dashboard!

## Features to Try

### Patient Dashboard
- ✅ Check symptoms with AI
- ✅ Log vital signs
- ✅ View health timeline
- ✅ Book appointments

### Doctor Dashboard
- ✅ View patient statistics
- ✅ Manage appointments
- ✅ Track earnings
- ✅ Monitor patients

## Optional: Add AI API Keys

Edit `backend/.env`:
```
OPENAI_API_KEY=your-key-here
ANTHROPIC_API_KEY=your-key-here
```

This enables the AI symptom checker feature.

## Troubleshooting

**Backend port in use?**
Change PORT in backend/.env

**Frontend port in use?**
The app will prompt to use another port

**Module not found?**
Run `pip install -r requirements.txt` in backend
Run `npm install` in frontend

---
🏥 Enjoy using CARE4U Health Platform!
