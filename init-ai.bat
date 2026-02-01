@echo off
echo ============================================
echo CARE4U AI Service Initialization
echo ============================================
echo.

REM Check if .env exists
if not exist ".env" (
    echo Creating .env file from template...
    copy .env.example .env >nul
    echo [OK] .env file created
    echo.
    echo [WARNING] IMPORTANT: Edit .env and add your AI API keys:
    echo    - OPENAI_API_KEY for GPT-3.5/GPT-4
    echo    - ANTHROPIC_API_KEY for Claude
    echo.
) else (
    echo [OK] .env file exists
)

echo Checking AI provider configuration...
echo.

REM Simple check for API keys in .env file
findstr /C:"OPENAI_API_KEY=sk-" .env >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] OpenAI API key configured
    set HAS_AI=true
) else (
    echo [X] OpenAI API key not configured
)

findstr /C:"ANTHROPIC_API_KEY=" .env | findstr /V "your-anthropic" >nul 2>&1
if %errorlevel% == 0 (
    echo [OK] Anthropic API key configured
    set HAS_AI=true
) else (
    echo [X] Anthropic API key not configured
)

echo.

if not defined HAS_AI (
    echo [WARNING] No AI providers configured!
    echo.
    echo The application will work with limited functionality.
    echo AI features (chat, symptom checker^) will show fallback messages.
    echo.
    echo To enable AI features:
    echo 1. Get an API key from:
    echo    - OpenAI: https://platform.openai.com/api-keys
    echo    - Anthropic: https://console.anthropic.com/
    echo 2. Add it to your .env file
    echo 3. Restart the backend server
    echo.
) else (
    echo [OK] AI services ready!
    echo.
)

echo ============================================
echo AI Initialization Complete
echo ============================================
echo.
echo The application supports running anywhere:
echo   * With AI keys: Full AI-powered features
echo   * Without AI keys: Basic features with fallback messages
echo   * Mixed providers: Automatically uses available provider
echo.
echo Test AI availability: GET http://localhost:5000/api/ai/health
echo.
pause
