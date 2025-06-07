@echo off
REM Add all changes
git add -A

REM Commit changes with a default message including date and time
git commit -m "Sync changes on %date% %time%"

REM Push to the default remote (origin) and branch (current)
git push

echo All changes have been synced to GitHub.
