CREATE USER 'bettingspree'@'localhost' IDENTIFIED BY 'PEI2020';
ALTER USER 'bettingspree'@'localhost' IDENTIFIED WITH mysql_native_password BY 'PEI2020';
GRANT ALL PRIVILEGES ON * . * TO 'bettingspree'@'localhost';
FLUSH PRIVILEGES;