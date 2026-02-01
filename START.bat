@echo off
echo ================================================
echo   VIDEO CONSULTATION + AI - QUICK START
echo ================================================
echo.
echo Starting Backend Server...
cd backend
start cmd /k "python app.py"
timeout /t 3 /nobreak >nul

echo.
echo Starting Frontend Server...
cd ..\frontend
start cmd /k "npx vite"

echo.
echo ================================================
echo   SERVERS STARTING...
echo ================================================
echo   Backend:  http://localhost:5000
echo   Frontend: http://localhost:5173
echo ================================================
echo.
echo Open http://localhost:5173 in your browser!
echo.
pause
