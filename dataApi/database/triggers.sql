use databettingspree;

Drop Trigger IF EXISTS follower_insert;
Delimiter $$
CREATE TRIGGER follower_insert
AFTER INSERT ON databettingspree.follower 
FOR EACH ROW
BEGIN
Update databettingspree.user Set followers = followers + 1 where iduser = NEW.following;
Update databettingspree.user Set following = following + 1 where iduser = NEW.me;
END $$
Delimiter ;

Drop Trigger IF EXISTS follower_delete;
Delimiter $$
CREATE TRIGGER follower_delete
AFTER DELETE ON databettingspree.follower 
FOR EACH ROW
BEGIN
Update databettingspree.user Set followers = followers - 1 where iduser = Old.following;
Update databettingspree.user Set following = following - 1 where iduser = Old.me;
END $$
Delimiter ;




Drop Trigger IF EXISTS copias_privadas;
Delimiter $$
CREATE TRIGGER copias_privadas
AFTER insert ON databettingspree.bet
FOR EACH ROW
BEGIN
declare originaluserid INT;
IF not isnull(new.originalbetid)
THEN
	select iduser into originaluserid from databettingspree.bet where idbet = NEW.originalbetid;
	Update databettingspree.user Set copiaspriv = copiaspriv + 1 where iduser = originaluserid;
    
    update databettingspree.user set rankscore = rankscore + 1 where iduser = originaluserid;
END IF;
END $$
Delimiter ;


Drop Trigger IF EXISTS total_odd_aposta;
Delimiter $$
CREATE TRIGGER total_odd_aposta
AFTER insert ON databettingspree.event
FOR EACH ROW
BEGIN
	Update databettingspree.bet Set oddtotal = oddtotal * NEW.odd where idbet = NEW.idbet;
END $$
Delimiter ;


Drop Trigger IF EXISTS update_aposta;
Delimiter $$
CREATE TRIGGER update_aposta
AFTER update ON databettingspree.bet
FOR EACH ROW
BEGIN

declare avg_bet FLOAT;
declare copias INT;
declare bets_ganhas INT;
declare bets_perdidas INT;

IF NEW.state != 0 THEN

	select AVG(oddtotal) into avg_bet from databettingspree.bet where iduser = old.iduser and isnull(originalbetid) and isDraft = false and state != 0;
    
    IF isnull(avg_bet) THEN
		set avg_bet = 0;
	END IF;
    
	Update databettingspree.user Set avgodd = avg_bet where iduser = old.iduser;
    
    select avgodd into avg_bet from databettingspree.user where iduser = OLD.iduser;
    select copiaspriv into copias from databettingspree.user where iduser = OLD.iduser;
    select count(idbet) into bets_ganhas from databettingspree.bet where old.iduser = iduser and state = 1 and isnull(originalbetid) and isDraft = false;
    select count(idbet) into bets_perdidas from databettingspree.bet where old.iduser = iduser and state = 2 and isnull(originalbetid) and isDraft = false;
    
    IF (bets_ganhas - bets_perdidas) > 0 THEN
    
		Update databettingspree.user Set rankscore = avg_bet * (bets_ganhas - bets_perdidas) + copias where iduser = old.iduser;
        
	ELSE 
		
        Update databettingspree.user Set rankscore = copias where iduser = old.iduser;
    
    END IF;

END IF;

END $$
Delimiter ;



Drop Trigger IF EXISTS eliminar_rascunho;
Delimiter $$
CREATE TRIGGER eliminar_rascunho
AFTER update ON databettingspree.event
FOR EACH ROW
BEGIN
	Update databettingspree.bet Set isDraft = 3 where idbet = NEW.idbet and isDraft=1;
END $$
Delimiter ;

