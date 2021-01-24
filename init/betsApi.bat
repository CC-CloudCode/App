@echo off
cd ../betsApi

IF EXIST node_modules\ (
    ECHO "Node Modules ja existe"
    npm start
) ELSE (
    ECHO "Node Modules nao existe"
    npm i
    npm start
)
