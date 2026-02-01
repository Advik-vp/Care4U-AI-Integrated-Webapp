# 🏥 Video Consultation + AI

A minimal hackathon-ready web app for video consultations with AI assistance.

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
pip install -r requirements.txt

# Configure environment (optional)
cp .env.example .env
# Edit .env to add your API keys (optional for basic demo)

# Run server
python app.py
```

Backend runs on: **http://localhost:5000**

### Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs on: **http://localhost:3000**

### Production Build

```bash
cd frontend
npm run build

cd ../backend
python app.py
```

Visit **http://localhost:5000** - Flask will serve the React build.

## 📋 Features

### 1. Landing Page
- Simple form for name and medical issue
- Creates unique consultation room
- Redirects to video room

### 2. Video Consultation Room
- **Left Panel**: Jitsi video (no setup required)
- **Right Panel**: AI chat assistant
- Split-screen layout

### 3. AI Chat
- Real-time chat with AI assistant
- Medical guidance and support
- Works without API key (fallback responses)

## 🔑 API Keys (Optional)

### OpenAI (for real AI responses)
1. Get key from: https://platform.openai.com/api-keys
2. Add to `backend/.env`:
   ```
   OPENAI_API_KEY=sk-your-key-here
   ```

### Twilio Video (alternative to Jitsi)
1. Get credentials from: https://www.twilio.com/console
2. Add to `backend/.env`:
   ```
   TWILIO_ACCOUNT_SID=ACxxxx
   TWILIO_API_KEY=SKxxxx
   TWILIO_API_SECRET=your-secret
   ```
3. In `frontend/src/pages/Room.jsx`, set `USE_TWILIO = true`

## 🏗️ Architecture

### Backend (Flask)
```
/backend
  app.py              # Main Flask app
  requirements.txt    # Python dependencies
  .env               # Environment variables (create from .env.example)
```

**Routes:**
- `POST /api/start` - Create consultation room
- `POST /api/ask-ai` - AI chat endpoint
- `POST /api/video/token` - Twilio token (optional)
- `GET /` - Serve React frontend

### Frontend (React + Vite)
```
/frontend
  src/
    App.jsx           # Main app with routing
    main.jsx          # Entry point
    pages/
      Home.jsx        # Landing page with form
      Room.jsx        # Video + chat room
    components/
      Chat.jsx        # AI chat component
  vite.config.js      # Vite configuration
  package.json        # npm dependencies
```

## 🎨 Tech Stack

**Backend:**
- Flask - Web framework
- Flask-CORS - Cross-origin requests
- OpenAI - AI chat (optional)
- Twilio - Video tokens (optional)

**Frontend:**
- React - UI framework
- Vite - Build tool
- React Router - Navigation
- Axios - HTTP requests

**Video:**
- Jitsi Meet - Default (no auth required)
- Twilio Video - Optional (requires tokens)

## 🧪 Testing

1. **Start Backend:**
   ```bash
   cd backend
   python app.py
   ```
   
2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Test Flow:**
   - Open http://localhost:3000
   - Enter name and issue
   - Click "Start Consultation"
   - Video loads in left panel
   - Chat with AI in right panel

## 📦 Deployment

### Option 1: Single Flask Server (Production)
```bash
cd frontend
npm run build

cd ../backend
python app.py
```

Access at: http://localhost:5000

### Option 2: Separate Servers (Development)
- Backend: http://localhost:5000
- Frontend: http://localhost:3000 (proxies API calls to backend)

## 🔧 Troubleshooting

**Backend not starting:**
- Check Python version: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Check port 5000 is available

**Frontend not connecting:**
- Check backend is running on port 5000
- Check console for CORS errors
- Verify proxy config in `vite.config.js`

**Video not loading:**
- Check browser permissions (camera/mic)
- Verify Jitsi URL is accessible
- Check iframe allow attributes

**AI not responding:**
- Check backend console for errors
- Verify API key (if using OpenAI)
- Check network requests in browser DevTools

## 🎯 Hackathon Tips

1. **Demo without API keys** - App works with dummy AI responses
2. **Jitsi requires no setup** - Video works immediately
3. **Clean UI** - Professional appearance for judges
4. **5-minute setup** - Easy for teammates to run
5. **Clear comments** - Code is well-documented

## 📝 License

MIT - Free for hackathon use!

## 🤝 Contributing

This is a hackathon template. Fork and customize as needed!

---

Built with ❤️ for student hackathons
