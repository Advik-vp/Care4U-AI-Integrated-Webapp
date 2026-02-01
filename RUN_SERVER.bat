@echo off
REM ============================================
REM CARE4U Health Platform - Startup Script
REM ============================================
title CARE4U Health Platform - Running...
cls
echo.
echo ============================================
echo CARE4U Health Platform Server
echo ============================================
echo.

cd /d C:\Users\advik\OneDrive\Desktop\Health\backend

echo [INFO] Activating virtual environment...
call venv\Scripts\activate.bat

echo [INFO] Starting Flask Server on port 5000...
echo.
echo ============================================
python main.py
echo ============================================

pause
