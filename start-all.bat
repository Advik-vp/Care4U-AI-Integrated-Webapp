@echo off
echo ============================================
echo Starting CARE4U Health Platform
echo ============================================
echo.
echo Starting Backend Server...
start "CARE4U Backend" cmd /k "cd backend && venv\Scripts\activate && python main.py"

timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "CARE4U Frontend" cmd /k "cd frontend && npm start"

echo.
echo ============================================
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo ============================================
echo.
echo Press any key to close this window (servers will keep running)
pause >nul
