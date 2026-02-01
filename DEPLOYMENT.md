# CARE4U - Deployment Guide

## 🌐 Quick Deployment Options

### Option 1: Deploy Backend to Render

1. Create account at [render.com](https://render.com)

2. Create new Web Service:
   - Connect your GitHub repository
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `python main.py`

3. Add Environment Variables:
   ```
   SECRET_KEY=your-production-secret-key
   OPENAI_API_KEY=your-openai-key
   ANTHROPIC_API_KEY=your-anthropic-key
   DEBUG=False
   HOST=0.0.0.0
   PORT=10000
   ```

4. Deploy! Your backend will be at: `https://your-app.onrender.com`

### Option 2: Deploy Frontend to Vercel

1. Create account at [vercel.com](https://vercel.com)

2. Import your project:
   - Connect GitHub repository
   - Framework: React
   - Root Directory: `frontend`

3. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://your-backend.onrender.com/api
   ```

4. Deploy! Your frontend will be at: `https://your-app.vercel.app`

### Option 3: Deploy Backend to Heroku

1. Install Heroku CLI and login:
   ```bash
   heroku login
   ```

2. Create new app:
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. Set environment variables:
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set OPENAI_API_KEY=your-openai-key
   heroku config:set ANTHROPIC_API_KEY=your-anthropic-key
   heroku config:set DEBUG=False
   ```

4. Create Procfile in backend:
   ```
   web: python main.py
   ```

5. Deploy:
   ```bash
   git add .
   git commit -m "Deploy to Heroku"
   git push heroku main
   ```

### Option 4: Deploy Frontend to Netlify

1. Create account at [netlify.com](https://netlify.com)

2. Drag and drop your `frontend` folder after building:
   ```bash
   cd frontend
   npm run build
   ```

3. Or connect GitHub:
   - New site from Git
   - Choose repository
   - Build command: `npm run build`
   - Publish directory: `build`

4. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.com/api
   ```

## 🐳 Docker Deployment

### Create Dockerfile for Backend

`backend/Dockerfile`:
```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "main.py"]
```

### Create Dockerfile for Frontend

`frontend/Dockerfile`:
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine
COPY --from=0 /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose (Both Services)

`docker-compose.yml`:
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - SECRET_KEY=your-secret-key
      - OPENAI_API_KEY=your-openai-key
      - DEBUG=False
    volumes:
      - ./backend/data:/app/data

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      - REACT_APP_API_URL=http://localhost:5000/api
```

Run with:
```bash
docker-compose up -d
```

## 📊 Production Database Setup

### PostgreSQL Setup

1. Install psycopg2:
   ```bash
   pip install psycopg2-binary
   ```

2. Update backend/config.py:
   ```python
   DATABASE_URL = os.getenv('DATABASE_URL')
   ```

3. Create database schema (example):
   ```sql
   CREATE TABLE users (
       id SERIAL PRIMARY KEY,
       username VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       email VARCHAR(100) NOT NULL,
       role VARCHAR(20) NOT NULL,
       full_name VARCHAR(100),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE patient_data (
       id SERIAL PRIMARY KEY,
       user_id INTEGER REFERENCES users(id),
       health_score INTEGER,
       data JSONB,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

### MongoDB Setup

1. Install pymongo:
   ```bash
   pip install pymongo
   ```

2. Update services to use MongoDB:
   ```python
   from pymongo import MongoClient
   
   client = MongoClient(os.getenv('MONGODB_URI'))
   db = client.health_platform
   ```

## 🔐 Production Security Checklist

- [ ] Change SECRET_KEY to strong random value
- [ ] Set DEBUG=False
- [ ] Use HTTPS (SSL certificates)
- [ ] Enable CORS only for your frontend domain
- [ ] Use environment variables for all sensitive data
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization
- [ ] Set secure cookie flags
- [ ] Use strong password policies
- [ ] Implement CSP headers
- [ ] Regular security updates

## ⚡ Performance Optimization

### Backend
- Add Redis for session storage
- Implement caching
- Use Gunicorn for production:
  ```bash
  pip install gunicorn
  gunicorn -w 4 -b 0.0.0.0:5000 main:app
  ```

### Frontend
- Enable React production build
- Use CDN for static assets
- Implement code splitting
- Lazy load components
- Optimize images
- Enable gzip compression

## 📈 Monitoring

### Backend Monitoring
```python
# Add logging
import logging
logging.basicConfig(level=logging.INFO)
```

### Error Tracking
- Sentry for error tracking
- Google Analytics for frontend
- CloudWatch/Datadog for infrastructure

## 🌍 Environment-Specific Configs

### Development
```
DEBUG=True
CORS=*
```

### Staging
```
DEBUG=True
CORS=your-staging-domain.com
```

### Production
```
DEBUG=False
CORS=your-production-domain.com
```

## 🚀 CI/CD Pipeline

### GitHub Actions Example

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          # Your deploy script here

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm install -g vercel
          vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## 📝 Post-Deployment Checklist

- [ ] Test all authentication flows
- [ ] Test all API endpoints
- [ ] Verify AI integration works
- [ ] Check responsive design on mobile
- [ ] Test error handling
- [ ] Verify CORS settings
- [ ] Check SSL certificate
- [ ] Test database connections
- [ ] Monitor logs for errors
- [ ] Set up backup strategy

## 🎯 Recommended Stack

**Free Tier Deployment:**
- Backend: Render (free tier)
- Frontend: Vercel (free tier)
- Database: Railway PostgreSQL (free tier)

**Production Stack:**
- Backend: AWS EC2 / DigitalOcean
- Frontend: Vercel / Netlify Pro
- Database: AWS RDS / MongoDB Atlas
- CDN: Cloudflare
- Monitoring: Datadog / New Relic

---

**🎉 Your CARE4U platform is ready for the world!**

Choose your deployment method and go live!
