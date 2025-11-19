@echo off
echo 🚀 Starting Phone Store Frontend...
echo.

:: Change to frontend directory
cd /d "%~dp0frontend"

:: Start Python HTTP server
echo 📂 Frontend directory: %cd%
echo.
echo 🌐 Starting frontend server at http://localhost:8000...
echo.

python -m http.server 8000

pause
