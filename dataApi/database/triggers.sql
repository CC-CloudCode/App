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

