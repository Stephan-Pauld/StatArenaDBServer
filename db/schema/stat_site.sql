-- -----------------------------------------------------
-- Schema stat_site
-- -----------------------------------------------------
DROP DATABASE IF EXISTS `stat_site`;
CREATE DATABASE IF NOT EXISTS `stat_site`;
USE `stat_site` ;

-- -----------------------------------------------------
-- Drop all tables
-- -----------------------------------------------------
DROP TABLE IF EXISTS `users` CASCADE;
DROP TABLE IF EXISTS `achievement_badges` CASCADE;
DROP TABLE IF EXISTS `guns` CASCADE;

DROP TABLE IF EXISTS `user_achievements`;
DROP TABLE IF EXISTS `user_tracked_stats`;
DROP TABLE IF EXISTS `achievements`;
DROP TABLE IF EXISTS `gun_attachments`;
DROP TABLE IF EXISTS `tactical_lethal`;
DROP TABLE IF EXISTS `drop_zones`;
DROP TABLE IF EXISTS `special_rules`;

-- -----------------------------------------------------
-- Table `achievement_badges`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `achievement_badges` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);

-- -----------------------------------------------------
-- Table `achievements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `achievements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `badge_id` INT NOT NULL,
  `frequency` VARCHAR(45) NOT NULL,
  `starts_on` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ends_on` DATETIME NOT NULL,
  `category` VARCHAR(45) NOT NULL,
  `category_ratio` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_achievements_1_idx` (`badge_id` ASC) VISIBLE,
  CONSTRAINT `fk_achievements_1`
    FOREIGN KEY (`badge_id`)
    REFERENCES `achievement_badges` (`id`)
    ON DELETE CASCADE);

-- -----------------------------------------------------
-- Table `drop_zones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `drop_zones` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `guns`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `guns` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `gun_attachments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gun_attachments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gun_id` INT NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_gun_attachments_1_idx` (`gun_id` ASC) VISIBLE,
  CONSTRAINT `fk_gun_attachments_1`
    FOREIGN KEY (`gun_id`)
    REFERENCES `guns` (`id`)
    ON DELETE CASCADE);

-- -----------------------------------------------------
-- Table `gun_attachments`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `tactical_lethal` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `gun_id` INT NOT NULL,
  `type` VARCHAR(255) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_tactical_lethal_1_idx` (`gun_id` ASC) VISIBLE,
  CONSTRAINT `fk_tactical_lethal_1`
    FOREIGN KEY (`gun_id`)
    REFERENCES `guns` (`id`)
    ON DELETE CASCADE);

-- -----------------------------------------------------
-- Table `special_rules`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `special_rules` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `text` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `gamer_tag` VARCHAR(255) NULL DEFAULT NULL,
  `gamer_platform` VARCHAR(255) NULL DEFAULT NULL,
  `oauth_token_id` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE);


-- -----------------------------------------------------
-- Table `user_achievements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_achievements` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `achievements_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_user_achievements_1_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_user_achievements_2_idx` (`achievements_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_achievements_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE,
  CONSTRAINT `fk_user_achievements_2`
    FOREIGN KEY (`achievements_id`)
    REFERENCES `achievements` (`id`));


-- -----------------------------------------------------
-- Table `user_tracked_stats`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user_tracked_stats` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `tracked_item` JSON NOT NULL,
  `stat_name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_user_tracked_stats_1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_tracked_stats_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE);

