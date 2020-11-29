CREATE USER 'bettingspree'@'localhost' IDENTIFIED BY 'PEI2020';
ALTER USER 'bettingspree'@'localhost' IDENTIFIED WITH mysql_native_password BY 'PEI2020';
GRANT ALL PRIVILEGES ON * . * TO 'bettingspree'@'localhost';
FLUSH PRIVILEGES;

insert into country values ('EN', "England", "https://media.api-sports.io/flags/gb.svg");
insert into country values ('ES', "Spain", "https://media.api-sports.io/flags/es.svg");
insert into country values ('PT', "Portugal", "https://media.api-sports.io/flags/pt.svg");

Select begintime, idfixture, TIMESTAMPDIFF(HOUR, now(), begintime) as timediff from fixture where state = 'Not Started' and now() < begintime and TIMESTAMPDIFF(HOUR, now(), begintime) < 2;

INSERT INTO fixture (idfixture, begintime, hometeam,awayteam, idleague, state, oddhome, oddaway, odddraw, scoreHome, scoreAway) VALUES (1,"2020-11-27T23:25:00", 33, 62,2790, "Not Started", 0,0,0, 0, 0);