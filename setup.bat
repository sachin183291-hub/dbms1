@echo off
REM Setup script for Digital Krishi Officer Database Integration

echo.
echo ========================================
echo Digital Krishi Officer - Setup Script
echo ========================================
echo.

REM Check if server directory exists
if not exist "server" (
    echo [!] Server directory not found!
    echo Please ensure you're in the project root directory
    exit /b 1
)

echo [1] Installing backend dependencies...
cd server
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [!] Failed to install dependencies
    exit /b 1
)

echo [2] Creating .env file from template...
if not exist ".env" (
    copy .env.example .env
    echo [✓] .env file created. Please edit it with your MongoDB connection string and credentials
) else (
    echo [✓] .env file already exists
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit server\.env with your configuration
echo 2. Start backend: npm run dev
echo 3. Start frontend: npm run dev (in project root)
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
pause
