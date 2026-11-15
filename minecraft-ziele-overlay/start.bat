@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Minecraft Ziele - Auto-Tracker
where py >nul 2>nul
if %errorlevel%==0 (
  py -3 ziele_server.py
) else (
  python ziele_server.py
)
echo.
echo Das Programm wurde beendet.
pause
