@echo off
cd ../dashboardApi/interface

IF EXIST node_modules\ (
    ECHO "Node Modules ja existe"
    npm run serve
) ELSE (
    ECHO "Node Modules nao existe"
    npm i
    npm run serve
)