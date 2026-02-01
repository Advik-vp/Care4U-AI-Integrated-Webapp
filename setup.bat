@echo off
echo ============================================
echo CARE4U Health Platform - Setup Script
echo ============================================
echo.

:: Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ from https://www.python.org/
    pause
    exit /b 1
)

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/4] Setting up Backend...
cd backend

:: Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating Python virtual environment...
    python -m venv venv
)

:: Activate virtual environment and install dependencies
echo Installing backend dependencies...
call venv\Scripts\activate
pip install -r requirements.txt

cd ..

echo.
echo [2/4] Setting up Frontend...
cd frontend

:: Install npm dependencies
echo Installing frontend dependencies...
call npm install

cd ..

echo.
echo [3/4] Checking environment files...
if not exist "backend\.env" (
    echo Creating backend .env file...
    copy backend\.env.example backend\.env
)

if not exist "frontend\.env" (
    echo Creating frontend .env file...
    copy frontend\.env.example frontend\.env
)

echo.
echo ============================================
echo Setup Complete!
echo ============================================
echo.
echo To start the application:
echo 1. Open TWO terminal windows
echo 2. In terminal 1: run 'start-backend.bat'
echo 3. In terminal 2: run 'start-frontend.bat'
echo.
echo Or simply run 'start-all.bat' to start both!
echo.
pause
