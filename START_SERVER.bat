@echo off
setlocal enabledelayedexpansion

echo ================================================
echo     CARE4U Health Platform Server Starter
echo ================================================
echo.

cd /d C:\Users\advik\OneDrive\Desktop\Health\backend

echo [1/3] Activating Python Virtual Environment...
if exist "venv\Scripts\activate.bat" (
    call venv\Scripts\activate.bat
    echo ✓ Virtual environment activated
) else (
    echo ✗ Virtual environment not found!
    exit /b 1
)

echo.
echo [2/3] Checking dependencies...
python -c "import flask, pymongo, openai, anthropic, dotenv; print('✓ All dependencies installed')" 2>nul
if !errorlevel! neq 0 (
    echo ✗ Missing dependencies! Installing...
    pip install -r requirements.txt
)

echo.
echo [3/3] Starting CARE4U Server...
echo.
echo ================================================
echo Server starting on http://localhost:5000
echo ================================================
echo.

python main.py

pause
