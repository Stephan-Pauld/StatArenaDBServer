CREATE DATABASE  IF NOT EXISTS `stat_site` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `stat_site`;
-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: stat_site
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `achievements`
--

DROP TABLE IF EXISTS `achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `badge` varchar(255) DEFAULT NULL,
  `weekly` tinyint NOT NULL DEFAULT '0',
  `monthly` tinyint NOT NULL DEFAULT '0',
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `headshots` int DEFAULT NULL,
  `accuracy` double DEFAULT NULL,
  `kdratio` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `achievements`
--

LOCK TABLES `achievements` WRITE;
/*!40000 ALTER TABLE `achievements` DISABLE KEYS */;
INSERT INTO `achievements` VALUES (1,'HighKD','https://www.flaticon.com/svg/static/icons/svg/3951/3951948.svg',0,0,'2020-12-29 16:28:16',NULL,NULL,1),(2,'Head Hunter','https://www.flaticon.com/svg/static/icons/svg/1596/1596880.svg',0,0,'2020-12-29 16:38:14',10,NULL,NULL),(3,'Bad Shot','https://www.flaticon.com/svg/static/icons/svg/601/601932.svg',0,0,'2020-12-29 16:38:53',NULL,0.1,NULL),(4,'Sharp Shooter','https://www.flaticon.com/svg/static/icons/svg/2913/2913517.svg',0,0,'2020-12-29 16:46:45',NULL,NULL,NULL),(5,'Shot Fired!','https://www.flaticon.com/svg/static/icons/svg/3588/3588276.svg',0,0,'2020-12-29 16:47:41',NULL,NULL,NULL);
/*!40000 ALTER TABLE `achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tracked_stats`
--

DROP TABLE IF EXISTS `tracked_stats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tracked_stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) DEFAULT NULL,
  `tracked` json DEFAULT NULL,
  `stat_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tracked_stats`
--

LOCK TABLES `tracked_stats` WRITE;
/*!40000 ALTER TABLE `tracked_stats` DISABLE KEYS */;
INSERT INTO `tracked_stats` VALUES (67,'1','{\"gun\": \"iw8_ar_anovember94\", \"hits\": 0, \"image\": \"/static/media/an-94.0d3102a9.png\", \"kills\": 0, \"shots\": 0, \"kdRatio\": 0, \"accuracy\": 0, \"headShots\": 0}','iw8_ar_anovember94'),(69,'1','{\"gun\": \"iw8_la_rpapa7\", \"hits\": 0, \"image\": \"/static/media/rpg-7.b6572509.png\", \"kills\": 0, \"shots\": 2, \"kdRatio\": 0, \"accuracy\": 0, \"headShots\": 0}','iw8_la_rpapa7');
/*!40000 ALTER TABLE `tracked_stats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_achievements`
--

DROP TABLE IF EXISTS `user_achievements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_achievements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(45) NOT NULL,
  `achievement_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_achievements`
--

LOCK TABLES `user_achievements` WRITE;
/*!40000 ALTER TABLE `user_achievements` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_achievements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Stefler#1173');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-01 10:40:45

DROP TABLE IF EXISTS dropzone CASCADE;

--
-- Table structure for table `dropzone`
--

CREATE TABLE dropzone (
  `id` int NOT NULL AUTO_INCREMENT,
  `dropzone` varchar(255) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);

--
-- Table structure for table `special rules`
--

DROP TABLE IF EXISTS rules CASCADE;

CREATE TABLE rules (
  `id` int NOT NULL AUTO_INCREMENT,
  `rules` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS weapon CASCADE;

CREATE TABLE weapon (
 `id` int NOT NULL AUTO_INCREMENT,
  `weapon` VARCHAR(100) NOT NULL,
  `image` VARCHAR(100) NOT NULL,
  `class` VARCHAR(100) NOT NULL,
    PRIMARY KEY (`id`)
);