CREATE USER 'bettingspree'@'localhost' IDENTIFIED BY 'PEI2020';
ALTER USER 'bettingspree'@'localhost' IDENTIFIED WITH mysql_native_password BY 'PEI2020';
GRANT ALL PRIVILEGES ON * . * TO 'bettingspree'@'localhost';
FLUSH PRIVILEGES;

insert into country values (1, 'EN', "England", "https://media.api-sports.io/flags/gb.svg");
insert into country values (2, 'ES', "Spain", "https://media.api-sports.io/flags/es.svg");
insert into country values (3, 'PT', "Portugal", "https://media.api-sports.io/flags/pt.svg");
