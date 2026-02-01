# CARE4U - Troubleshooting Guide

## Common Issues & Solutions

### Backend Issues

#### 1. "ModuleNotFoundError: No module named 'flask'"

**Solution:**
```bash
cd backend
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

#### 2. "Address already in use: Port 5000"

**Solution:**
- Kill the process using port 5000:
  ```bash
  # Windows
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```
- Or change the port in `backend/.env`:
  ```
  PORT=5001
  ```

#### 3. "AI service not configured"

**Solution:**
- Add your API keys to `backend/.env`:
  ```
  OPENAI_API_KEY=sk-...
  ANTHROPIC_API_KEY=sk-ant-...
  ```
- The app works without AI keys (shows friendly error messages)

#### 4. "CORS error when calling API"

**Solution:**
- Check backend is running
- Verify Flask-CORS is installed: `pip install flask-cors`
- Check frontend is calling correct API URL in `.env`

#### 5. "Cannot find data directory"

**Solution:**
- The app creates `data/` automatically
- If issues persist, manually create:
  ```bash
  mkdir backend/data
  ```

### Frontend Issues

#### 1. "npm: command not found"

**Solution:**
- Install Node.js from [nodejs.org](https://nodejs.org)
- Verify installation: `node --version`

#### 2. "Port 3000 already in use"

**Solution:**
- The React app will prompt to use another port (press Y)
- Or kill the process using port 3000:
  ```bash
  # Windows
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
  ```

#### 3. "Module not found: Can't resolve 'react-router-dom'"

**Solution:**
```bash
cd frontend
npm install
```

#### 4. "Failed to compile - Tailwind CSS error"

**Solution:**
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
```

#### 5. "API request failed with 404"

**Solution:**
- Check backend is running on http://localhost:5000
- Verify `REACT_APP_API_URL` in `frontend/.env`:
  ```
  REACT_APP_API_URL=http://localhost:5000/api
  ```
- Restart frontend after changing .env file

### Authentication Issues

#### 1. "Invalid credentials" when logging in

**Solution:**
- Make sure you registered first
- Check username and password match
- Clear browser cache/localStorage:
  ```javascript
  // In browser console
  localStorage.clear()
  ```

#### 2. "Token expired" error

**Solution:**
- Login again (tokens expire after 7 days)
- Or adjust expiration in `backend/app/services/auth_service.py`:
  ```python
  'exp': datetime.utcnow() + timedelta(days=30)  # 30 days
  ```

#### 3. Redirected to login constantly

**Solution:**
- Check if token is being saved:
  ```javascript
  // In browser console
  console.log(localStorage.getItem('token'))
  ```
- Clear browser data and login again

### Database/Storage Issues

#### 1. "Permission denied" when writing to data files

**Solution (Windows):**
```bash
# Run as administrator
icacls backend\data /grant Everyone:F /T
```

#### 2. "JSON decode error"

**Solution:**
- Delete corrupted JSON files:
  ```bash
  del backend\data\*.json
  ```
- App will recreate them automatically

#### 3. Data not persisting

**Solution:**
- Check `backend/data/` directory exists
- Verify write permissions
- Check console for errors

### UI/Display Issues

#### 1. Styles not loading

**Solution:**
```bash
cd frontend
npm install tailwindcss postcss autoprefixer
npm start
```

#### 2. Images not displaying

**Solution:**
- Check `frontend/src/assets/images/` directory
- Use proper import paths
- Clear browser cache

#### 3. Components not rendering

**Solution:**
- Check browser console for errors
- Verify all dependencies installed
- Check component imports

### API Integration Issues

#### 1. "Network Error" when calling API

**Solution:**
- Ensure backend is running
- Check firewall isn't blocking localhost:5000
- Verify CORS is enabled in backend

#### 2. "429 Too Many Requests" from AI APIs

**Solution:**
- You've hit API rate limits
- Wait a few minutes
- Consider upgrading API plan

#### 3. AI responses taking too long

**Solution:**
- Normal for first request (model loading)
- Subsequent requests are faster
- Check your internet connection

### Development Issues

#### 1. Changes not reflecting

**Solution:**
- **Backend:** Restart the server (Ctrl+C, then `python main.py`)
- **Frontend:** Clear browser cache (Ctrl+Shift+R)
- Check file was actually saved

#### 2. "Cannot import" errors

**Solution:**
- Check file paths are correct
- Verify module exists
- Check for typos in import statements

#### 3. Git merge conflicts

**Solution:**
```bash
# Keep your changes
git checkout --ours <file>

# Keep incoming changes
git checkout --theirs <file>

# Manually resolve
code <file>  # Edit, then:
git add <file>
git commit
```

## Quick Diagnostics

### Check Backend Health
```bash
# Should return 200 OK
curl http://localhost:5000/api/auth/verify
```

### Check Frontend Build
```bash
cd frontend
npm run build
# Should complete without errors
```

### Check Python Environment
```bash
cd backend
.\venv\Scripts\activate
python --version  # Should be 3.8+
pip list  # Check installed packages
```

### Check Node Environment
```bash
cd frontend
node --version  # Should be 14+
npm --version
npm list react  # Check React version
```

## Performance Issues

### Slow Backend

**Solutions:**
- Optimize JSON file reads (cache in memory)
- Switch to proper database
- Use connection pooling
- Enable gzip compression

### Slow Frontend

**Solutions:**
```bash
# Build for production
npm run build

# Analyze bundle size
npm install -D webpack-bundle-analyzer
npm run build -- --stats
```

### High Memory Usage

**Solutions:**
- Restart the servers
- Clear browser cache
- Close unused browser tabs
- Update to latest dependencies

## Still Having Issues?

### Check Logs

**Backend logs:**
- Look in terminal where backend is running
- Check for error stack traces

**Frontend logs:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for failed requests

### Debug Mode

**Enable verbose logging:**

Backend (`backend/config.py`):
```python
DEBUG = True
```

Frontend: Check browser console

### Get Help

1. Check existing issues in repository
2. Create new issue with:
   - Error message
   - Steps to reproduce
   - OS and versions
   - Screenshots if applicable

### Nuclear Option (Fresh Start)

```bash
# Delete everything and start over
cd Health
rmdir /s backend\venv
rmdir /s backend\data
rmdir /s frontend\node_modules

# Then run setup again
setup.bat
```

## Prevention Tips

- ✅ Always activate virtual environment for backend
- ✅ Run `npm install` after pulling changes
- ✅ Keep dependencies updated
- ✅ Don't commit `.env` files
- ✅ Use `.gitignore` properly
- ✅ Test after each significant change
- ✅ Keep backups of data files

---

**💡 Most issues are solved by:**
1. Reinstalling dependencies
2. Restarting servers
3. Clearing browser cache
4. Checking environment variables

If all else fails, try the "Nuclear Option" above!
