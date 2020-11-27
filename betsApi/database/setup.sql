-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema betsbettingspree
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema betsbettingspree
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `betsbettingspree` DEFAULT CHARACTER SET utf8 ;
USE `betsbettingspree` ;

-- -----------------------------------------------------
-- Table `betsbettingspree`.`country`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betsbettingspree`.`country` (
  `idcountry` VARCHAR(10) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `flag` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idcountry`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betsbettingspree`.`league`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betsbettingspree`.`league` (
  `idleague` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(100) NOT NULL,
  `idcountry` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idleague`),
  INDEX `fk_league_country1_idx` (`idcountry` ASC) VISIBLE,
  CONSTRAINT `fk_league_country1`
    FOREIGN KEY (`idcountry`)
    REFERENCES `betsbettingspree`.`country` (`idcountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betsbettingspree`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betsbettingspree`.`team` (
  `idteam` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `logo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idteam`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betsbettingspree`.`team_stats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betsbettingspree`.`team_stats` (
  `idteam_stats` INT NOT NULL AUTO_INCREMENT,
  `idleague` INT NOT NULL,
  `idteam` INT NOT NULL,
  `matchsPlayedHome` INT NOT NULL,
  `matchsPlayedAway` INT NOT NULL,
  `winsHome` INT NOT NULL,
  `winsAway` INT NOT NULL,
  `drawsHome` INT NOT NULL,
  `drawsAway` INT NOT NULL,
  `losesHome` INT NOT NULL,
  `losesAway` INT NOT NULL,
  `goalsForHome` INT NOT NULL,
  `goalsForAway` INT NOT NULL,
  `goalsAgainstHome` INT NOT NULL,
  `goalsAgainstAway` INT NOT NULL,
  `matchsPlayedTotal` INT NOT NULL,
  `winsTotal` INT NOT NULL,
  `drawsTotal` INT NOT NULL,
  `losesTotal` INT NOT NULL,
  `goalsForTotal` INT NOT NULL,
  `goalsAgainstTotal` INT NOT NULL,
  `goalsDiff` FLOAT NOT NULL,
  `position` INT NOT NULL,
  `group` VARCHAR(50) NULL,
  `points` INT NOT NULL,
  `forme` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`idteam_stats`),
  INDEX `fk_team_stats_league1_idx` (`idleague` ASC) VISIBLE,
  INDEX `fk_team_stats_team1_idx` (`idteam` ASC) VISIBLE,
  CONSTRAINT `fk_team_stats_league1`
    FOREIGN KEY (`idleague`)
    REFERENCES `betsbettingspree`.`league` (`idleague`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_team_stats_team1`
    FOREIGN KEY (`idteam`)
    REFERENCES `betsbettingspree`.`team` (`idteam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betsbettingspree`.`fixture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betsbettingspree`.`fixture` (
  `idfixture` INT NOT NULL,
  `begintime` DATETIME NOT NULL,
  `homeTeam` INT NOT NULL,
  `awayTeam` INT NOT NULL,
  `idleague` INT NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `oddHome` DOUBLE NOT NULL,
  `oddAway` DOUBLE NOT NULL,
  `oddDraw` DOUBLE NOT NULL,
  `scoreHome` INT NULL,
  `scoreAway` INT NULL,
  PRIMARY KEY (`idfixture`),
  INDEX `fk_fixture_team1_idx` (`homeTeam` ASC) VISIBLE,
  INDEX `fk_fixture_team2_idx` (`awayTeam` ASC) VISIBLE,
  INDEX `fk_fixture_league1_idx` (`idleague` ASC) VISIBLE,
  CONSTRAINT `fk_fixture_team1`
    FOREIGN KEY (`homeTeam`)
    REFERENCES `betsbettingspree`.`team` (`idteam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fixture_team2`
    FOREIGN KEY (`awayTeam`)
    REFERENCES `betsbettingspree`.`team` (`idteam`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_fixture_league1`
    FOREIGN KEY (`idleague`)
    REFERENCES `betsbettingspree`.`league` (`idleague`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `betsbettingspree`.`h2h`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `betsbettingspree`.`h2h` (
  `idh2h` INT NOT NULL,
  `idfixture` INT NOT NULL,
  `homeTeamId` INT NOT NULL,
  `awayTeamId` INT NOT NULL,
  `score` VARCHAR(10) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`idh2h`),
  INDEX `fk_h2h_fixture1_idx` (`idfixture` ASC) VISIBLE,
  CONSTRAINT `fk_h2h_fixture1`
    FOREIGN KEY (`idfixture`)
    REFERENCES `betsbettingspree`.`fixture` (`idfixture`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
