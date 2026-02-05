@echo off
REM Quick Start Script for Digital Krishi Officer

echo.
echo ================================================
echo Digital Krishi Officer - Complete DBMS System
echo ================================================
echo.

echo [INFO] This script will guide you through starting the system
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js installed
echo.

REM Start backend server
echo [STEP 1] Starting Backend Server...
echo Navigating to server folder...
cd server

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

echo.
echo ================================================
echo Starting Backend on http://localhost:5000
echo ================================================
echo.

start cmd /k npm start

timeout /t 3 >nul

REM Return to root and start frontend
cd ..

REM Start frontend
echo.
echo [STEP 2] Starting Frontend Server...
echo.
echo ================================================
echo Starting Frontend on http://localhost:3000
echo ================================================
echo.

start cmd /k npm run dev

echo.
echo ================================================
echo System is starting!
echo ================================================
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo API Docs: Check DBMS_COMPLETE.md
echo.
echo Please wait for both servers to fully start...
echo.
pause
