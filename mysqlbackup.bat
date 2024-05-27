@echo off

rem Path to MySQL server bin folder
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"

rem Credentials to connect to MySQL server
set mysql_user=root
set mysql_password=Amare_Abewa12

rem Backup file name generation
set backup_path=E:\Final_Project\Back_up
set full_backup_name=project_full.sql

rem Format the date to remove characters that are not valid in file names
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set "current_date=%%I"
set "current_date=%current_date:~0,4%-%current_date:~4,2%-%current_date:~6,2%"
set diff_backup_name=project_diff_%current_date%.sql

rem Perform full backup (replace if needed)
IF EXIST "%backup_path%\%full_backup_name%" (
  echo Full backup already exists: %full_backup_name%
) ELSE (
  echo Creating full backup of project database...
  mysqldump --user=%mysql_user% --password=%mysql_password% --databases project --routines --events --result-file="%backup_path%\%full_backup_name%"
  IF %ERRORLEVEL% neq 0 (
    echo Backup failed: error during dump creation >> "%backup_path%\mysql_backup_log.txt"
    EXIT /B 1
  )
)

rem Perform differential backup (captures changes since the last full backup)
echo Creating differential backup of project database...
mysqldump --user=%mysql_user% --password=%mysql_password% --databases project --routines --events --single-transaction --result-file="%backup_path%\%diff_backup_name%" --flush-logs --log-error="%backup_path%\mysql_backup_error.log"
IF %ERRORLEVEL% neq 0 (
  echo Backup failed: error during dump creation >> "%backup_path%\mysql_backup_log.txt"
  EXIT /B 1
)

echo Backup successful >> "%backup_path%\mysql_backup_log.txt"
