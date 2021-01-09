-- dinheiro apostado por dia
-- select sum(money) from bet where year(date)=2021 AND month(date)=00 and day(date)=06;
select date(date), sum(money) from bet group by date(date) order by date(date) asc limit 5;

-- dinheiro de apostas perdidas
select date(date), sum(money) from bet where state = 2 group by date(date) order by date(date) asc limit 5;

-- posts realizados por dia
select count(idpost) from post group by date(date) order by date(date) asc limit 5;

-- posts realizados por hora
select hour(date), count(idpost) from post where date(date)=date(date(now())-1) group by hour(date) order by hour(date);

-- rascunho criados por dia
select date(date), count(idbet) from bet where isDraft=1 group by date(date) order by date(date) asc limit 5;

-- posts publicos por dia
select date(date), count(idpost) from post where public=1 group by date(date) order by date(date) asc limit 5;

-- posts privados por dia
select date(date), count(idpost) from post where public=0 group by date(date) order by date(date) asc limit 5;