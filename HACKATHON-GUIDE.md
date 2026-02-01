# 🎯 HACKATHON PROJECT - VIDEO CONSULTATION + AI

## ✅ SETUP COMPLETE!

Your minimal video consultation app is ready to demo.

---

## 🚀 HOW TO START (2 STEPS)

### Option 1: Double-Click START.bat
Just double-click `START.bat` in the project root - it starts everything!

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
python app.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npx vite
```

---

## 🌐 ACCESS THE APP

- **Frontend (User Interface):** http://localhost:5173
- **Backend (API Server):** http://localhost:5000

---

## 📱 HOW TO USE

1. Open http://localhost:5173
2. Enter your name and medical issue
3. Click "Start Consultation"
4. **Left side:** Jitsi video call loads automatically
5. **Right side:** Chat with AI assistant

---

## 🏗️ WHAT WAS BUILT

### Backend (Flask - Python)
- ✅ Simple REST API
- ✅ Room creation endpoint (`/api/start`)
- ✅ AI chat endpoint (`/api/ask-ai`)
- ✅ Twilio video token endpoint (optional)
- ✅ Works WITHOUT API keys (dummy responses)

### Frontend (React + Vite)
- ✅ Clean landing page with form
- ✅ Video consultation room
- ✅ Jitsi video integration (no setup needed!)
- ✅ Real-time AI chat
- ✅ Mobile responsive design

---

## 🎨 FEATURES

### ✅ Working Features
- Video consultation via Jitsi
- AI chat (works with or without OpenAI key)
- Clean, professional UI
- Mobile responsive
- Room-based consultations
- Real-time messaging

### 🔮 Optional Enhancements
- Add OpenAI API key for real AI responses
- Switch to Twilio for video (requires credentials)
- Add user authentication
- Save chat history
- Recording functionality

---

## 🔑 ADDING API KEYS (OPTIONAL)

Your app works WITHOUT API keys, but you can add them for enhanced features.

### For Real AI Responses (OpenAI)
1. Get free credits: https://platform.openai.com
2. Edit `backend/.env`
3. Add: `OPENAI_API_KEY=sk-your-key-here`
4. Restart backend server

### For Twilio Video (Alternative to Jitsi)
1. Get free account: https://www.twilio.com
2. Edit `backend/.env`:
   ```
   TWILIO_ACCOUNT_SID=ACxxxx
   TWILIO_API_KEY=SKxxxx
   TWILIO_API_SECRET=your-secret
   ```
3. Edit `frontend/src/pages/Room.jsx`
4. Change `USE_TWILIO = false` to `USE_TWILIO = true`
5. Restart both servers

---

## 📂 PROJECT STRUCTURE

```
Health/
├── START.bat              # ⭐ Quick start script
├── README.md              # Full documentation
├── HACKATHON-GUIDE.md     # This file!
│
├── backend/
│   ├── app.py             # Main Flask server
│   ├── requirements.txt   # Python packages
│   ├── .env.example       # Config template
│   └── .env               # Your config (create this)
│
└── frontend/
    ├── src/
    │   ├── App.jsx        # Main React app
    │   ├── main.jsx       # Entry point
    │   ├── pages/
    │   │   ├── Home.jsx   # Landing page
    │   │   └── Room.jsx   # Video room
    │   └── components/
    │       └── Chat.jsx   # AI chat
    ├── index.html         # HTML template
    ├── package.json       # npm packages
    └── vite.config.js     # Build config
```

---

## 🐛 TROUBLESHOOTING

### Backend won't start
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend won't start
```bash
cd frontend
npm install
npx vite
```

### Port already in use
- Backend port 5000 busy? Change in `backend/app.py`:
  ```python
  app.run(host='0.0.0.0', port=5001, ...)
  ```
- Frontend port 5173 busy? Vite will auto-increment to 5174

### Video not loading
- Allow camera/mic permissions in browser
- Check browser console for errors
- Try different browser (Chrome/Firefox recommended)

### AI not responding
- Check backend terminal for errors
- AI works without API key (sends dummy responses)
- Add OPENAI_API_KEY to `.env` for real responses

---

## 🎯 DEMO TIPS FOR JUDGES

### Talking Points
1. **"5-Minute Setup"** - Show how easy it is to run
2. **"No Auth Required"** - Jitsi video works instantly
3. **"AI Integration"** - Smart medical assistant
4. **"Mobile Ready"** - Works on phones/tablets
5. **"Production Ready"** - Can add Twilio/OpenAI easily

### Demo Flow
1. Show landing page → form is simple and clear
2. Enter test data → creates unique room instantly
3. Video loads → show camera/mic controls
4. AI chat → send a few messages
5. Show mobile view → responsive design

### Key Differentiators
- ✅ Video + AI in ONE app
- ✅ Works without configuration
- ✅ Clean, professional UI
- ✅ Real-world use case (telemedicine)
- ✅ Scalable architecture

---

## 📊 TECH STACK SUMMARY

| Layer      | Technology           | Why                        |
|------------|----------------------|----------------------------|
| Backend    | Flask (Python)       | Simple, fast, hackathon-ready |
| Frontend   | React + Vite         | Modern, fast builds        |
| Video      | Jitsi Meet           | No auth, works instantly   |
| AI         | OpenAI (optional)    | Smart responses            |
| Styling    | Plain CSS            | No dependencies, fast      |
| Routing    | React Router         | Client-side navigation     |
| API Calls  | Axios                | Clean HTTP requests        |

---

## 🚀 NEXT STEPS (IF YOU HAVE TIME)

### Quick Wins (< 30 min)
- [ ] Add favicon and logo
- [ ] Customize colors/branding
- [ ] Add loading animations
- [ ] Improve error messages

### Medium Tasks (< 2 hours)
- [ ] Add user authentication
- [ ] Save chat history to file/database
- [ ] Add doctor notes feature
- [ ] Implement prescription upload

### Advanced (> 2 hours)
- [ ] MongoDB integration
- [ ] User dashboard
- [ ] Appointment scheduling
- [ ] Email notifications

---

## 💡 EXTENSION IDEAS

### For Health Track
- Symptom checker with AI
- Medical record storage
- Prescription management
- Appointment reminders

### For AI Track
- Smart diagnosis suggestions
- Medical literature search
- Treatment recommendations
- Health risk predictions

### For Accessibility Track
- Speech-to-text chat
- Multiple language support
- Screen reader optimization
- High contrast mode

---

## ✨ YOU'RE READY TO DEMO!

Your app is:
- ✅ Running locally
- ✅ Fully functional
- ✅ Demo-ready
- ✅ Well-documented

**Just open:** http://localhost:5173

---

## 📞 SUPPORT

If something breaks:
1. Check both servers are running
2. Read error messages in terminals
3. Check browser console (F12)
4. Restart servers
5. Clear browser cache

---

## 🏆 GOOD LUCK!

You have a working video consultation platform with AI chat!

**Key Points for Judges:**
- Real video calling
- AI assistance
- Clean, professional UI
- Works in under 5 minutes
- Scalable architecture

**Now go win that hackathon! 🎉**

---

Built with ❤️ for student hackathons
