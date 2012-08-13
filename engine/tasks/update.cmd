IF EXIST BlogHub del /s /q /a /i BlogHub\*.*
git clone git://github.com/Diullei/BlogHub.git
xcopy BlogHub\engine\*.* . /s /i /a