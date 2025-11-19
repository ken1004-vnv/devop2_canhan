@echo off
echo 🚀 Starting Phone Store Backend Setup...
echo.

:: Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js is installed

:: Change to backend directory
cd /d "%~dp0backend"

:: Install dependencies
echo.
echo 📦 Installing npm dependencies...
call npm install
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo ✅ Dependencies installed

:: Start server
echo.
echo 🎯 Starting backend server...
echo.
call npm start

pause
