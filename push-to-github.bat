@echo off
echo ============================================
echo   PUSH TO GITHUB - Quick Setup
echo ============================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo Initializing Git repository...
    git init
    git branch -M main
) else (
    echo Git already initialized!
)

echo.
echo Creating .gitignore if needed...

REM Add all files
echo.
echo Adding files to git...
git add .

echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Deploy: Prepare for Render and Vercel deployment

echo.
echo Committing changes...
git commit -m "%commit_msg%"

echo.
echo ============================================
echo NEXT STEPS:
echo ============================================
echo.
echo 1. Create a NEW repository on GitHub
echo    Go to: https://github.com/new
echo.
echo 2. Copy the repository URL
echo.
echo 3. Run these commands:
echo    git remote add origin YOUR_GITHUB_REPO_URL
echo    git push -u origin main
echo.
echo Example:
echo    git remote add origin https://github.com/username/care4u.git
echo    git push -u origin main
echo.
echo ============================================
pause
