-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema databettingspree
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema databettingspree
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `databettingspree` DEFAULT CHARACTER SET utf8 ;
USE `databettingspree` ;

-- -----------------------------------------------------
-- Table `databettingspree`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`user` (
  `iduser` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `birthdate` DATE NOT NULL,
  `password` VARCHAR(80) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `followers` INT NOT NULL,
  `following` INT NOT NULL,
  `private` TINYINT NOT NULL,
  `balance` DOUBLE NOT NULL,
  `copiaspriv` INT NOT NULL,
  `avgodd` FLOAT NOT NULL,
  `rankscore` INT NOT NULL,
  PRIMARY KEY (`iduser`),
  UNIQUE INDEX `username_UNIQUE` (`username` ASC) VISIBLE,
  UNIQUE INDEX `iduser_UNIQUE` (`iduser` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`bet`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`bet` (
  `idbet` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `money` DOUBLE NOT NULL,
  `iduser` INT NOT NULL,
  `state` INT NOT NULL,
  `originalbetid` INT NULL,
  `isDraft` TINYINT NOT NULL,
  `oddtotal` FLOAT NOT NULL,
  PRIMARY KEY (`idbet`),
  INDEX `fk_bet_user1_idx` (`iduser` ASC) VISIBLE,
  CONSTRAINT `fk_bet_user1`
    FOREIGN KEY (`iduser`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`group` (
  `idgroup` INT NOT NULL AUTO_INCREMENT,
  `createdby` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idgroup`),
  INDEX `fk_group_user1_idx` (`createdby` ASC) VISIBLE,
  CONSTRAINT `fk_group_user1`
    FOREIGN KEY (`createdby`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`post`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`post` (
  `idpost` INT NOT NULL AUTO_INCREMENT,
  `text` TEXT NULL,
  `public` TINYINT NOT NULL,
  `date` DATETIME NOT NULL,
  `iduser` INT NOT NULL,
  `idbet` INT NULL,
  `betpublic` TINYINT NULL,
  `idgroup` INT NULL,
  PRIMARY KEY (`idpost`),
  UNIQUE INDEX `idpost_UNIQUE` (`idpost` ASC) VISIBLE,
  INDEX `fk_post_user_idx` (`iduser` ASC) VISIBLE,
  INDEX `fk_post_bet1_idx` (`idbet` ASC) VISIBLE,
  INDEX `fk_post_group1_idx` (`idgroup` ASC) VISIBLE,
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`iduser`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_bet1`
    FOREIGN KEY (`idbet`)
    REFERENCES `databettingspree`.`bet` (`idbet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_group1`
    FOREIGN KEY (`idgroup`)
    REFERENCES `databettingspree`.`group` (`idgroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`comment` (
  `idcomment` INT NOT NULL AUTO_INCREMENT,
  `text` TEXT NOT NULL,
  `date` DATETIME NOT NULL,
  `iduser` INT NOT NULL,
  `idpost` INT NOT NULL,
  PRIMARY KEY (`idcomment`),
  INDEX `fk_comment_user1_idx` (`iduser` ASC) VISIBLE,
  INDEX `fk_comment_post1_idx` (`idpost` ASC) VISIBLE,
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`iduser`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_post1`
    FOREIGN KEY (`idpost`)
    REFERENCES `databettingspree`.`post` (`idpost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`upvotes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`upvotes` (
  `iduser` INT NOT NULL,
  `idpost` INT NOT NULL,
  PRIMARY KEY (`iduser`, `idpost`),
  INDEX `fk_user_has_post_post1_idx` (`idpost` ASC) VISIBLE,
  INDEX `fk_user_has_post_user1_idx` (`iduser` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_post_user1`
    FOREIGN KEY (`iduser`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_post_post1`
    FOREIGN KEY (`idpost`)
    REFERENCES `databettingspree`.`post` (`idpost`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`event`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`event` (
  `idevent` INT NOT NULL AUTO_INCREMENT,
  `idbetapi` VARCHAR(24) NOT NULL,
  `odd` FLOAT NOT NULL,
  `bettype` INT NOT NULL,
  `idbet` INT NOT NULL,
  `state` INT NOT NULL,
  PRIMARY KEY (`idevent`),
  INDEX `fk_event_bet1_idx` (`idbet` ASC) VISIBLE,
  CONSTRAINT `fk_event_bet1`
    FOREIGN KEY (`idbet`)
    REFERENCES `databettingspree`.`bet` (`idbet`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`follower`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`follower` (
  `me` INT NOT NULL,
  `following` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  INDEX `fk_user_has_user_user2_idx` (`following` ASC) VISIBLE,
  INDEX `fk_user_has_user_user1_idx` (`me` ASC) VISIBLE,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_has_user_user1`
    FOREIGN KEY (`me`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_user_user2`
    FOREIGN KEY (`following`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`usergroup`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`usergroup` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `idgroup` INT NOT NULL,
  `iduser` INT NOT NULL,
  `isAdmin` TINYINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_group_has_user_user1_idx` (`iduser` ASC) VISIBLE,
  INDEX `fk_group_has_user_group1_idx` (`idgroup` ASC) VISIBLE,
  CONSTRAINT `fk_group_has_user_group1`
    FOREIGN KEY (`idgroup`)
    REFERENCES `databettingspree`.`group` (`idgroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_group_has_user_user1`
    FOREIGN KEY (`iduser`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`followrequests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`followrequests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `requester` INT NOT NULL,
  `requested` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_followrequests_user1_idx` (`requester` ASC) VISIBLE,
  INDEX `fk_followrequests_user2_idx` (`requested` ASC) VISIBLE,
  CONSTRAINT `fk_followrequests_user1`
    FOREIGN KEY (`requester`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_followrequests_user2`
    FOREIGN KEY (`requested`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `databettingspree`.`grouprequests`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `databettingspree`.`grouprequests` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `iduser` INT NOT NULL,
  `idgroup` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_table1_user1_idx` (`iduser` ASC) VISIBLE,
  INDEX `fk_table1_group1_idx` (`idgroup` ASC) VISIBLE,
  CONSTRAINT `fk_table1_user1`
    FOREIGN KEY (`iduser`)
    REFERENCES `databettingspree`.`user` (`iduser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_table1_group1`
    FOREIGN KEY (`idgroup`)
    REFERENCES `databettingspree`.`group` (`idgroup`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
