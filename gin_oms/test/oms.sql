-- MySQL dump 10.13  Distrib 8.3.0, for macos14.2 (arm64)
--
-- Host: localhost    Database: oms_dataload
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rel_equipment_part`
--

DROP TABLE IF EXISTS `rel_equipment_part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rel_equipment_part` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `equipment_id` bigint unsigned DEFAULT NULL,
  `part_id` longtext COLLATE utf8mb4_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rel_equipment_part`
--

LOCK TABLES `rel_equipment_part` WRITE;
/*!40000 ALTER TABLE `rel_equipment_part` DISABLE KEYS */;
INSERT INTO `rel_equipment_part` VALUES (1,1,'part-1'),(2,1,'part-2'),(3,2,'part-1'),(4,2,'part-2'),(5,3,'part-1'),(6,3,'part-2'),(7,4,'part-1'),(8,4,'part-2'),(9,5,'part-1'),(10,5,'part-2'),(11,6,'part-1'),(12,6,'part-2'),(13,7,'part-1'),(14,7,'part-2'),(15,8,'part-1'),(16,8,'part-2'),(17,9,'part-1'),(18,9,'part-2'),(19,10,'part-1'),(20,10,'part-2'),(21,11,'part-1'),(22,11,'part-2'),(23,12,'part-1'),(24,12,'part-2'),(25,13,'part-1'),(26,13,'part-2'),(27,14,'part-1'),(28,14,'part-2'),(29,15,'part-1'),(30,15,'part-2'),(31,16,'part-1'),(32,16,'part-2');
/*!40000 ALTER TABLE `rel_equipment_part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_ata`
--

DROP TABLE IF EXISTS `tbl_ata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_ata` (
  `id` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(20) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_ata`
--

LOCK TABLES `tbl_ata` WRITE;
/*!40000 ALTER TABLE `tbl_ata` DISABLE KEYS */;
INSERT INTO `tbl_ata` VALUES ('21','ATA2'),('22','ATA3'),('23','ATA4'),('24','ATA5'),('25','ATA6'),('26','ATA7'),('27','ATA8'),('28','ATA9'),('29','ATA10'),('30','ATA11'),('31','ATA12');
/*!40000 ALTER TABLE `tbl_ata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_equipment`
--

DROP TABLE IF EXISTS `tbl_equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_equipment` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `ata_id` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_bin NOT NULL,
  `condition_text` varchar(912) COLLATE utf8mb4_bin NOT NULL,
  `protocol_type` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_equipment`
--

LOCK TABLES `tbl_equipment` WRITE;
/*!40000 ALTER TABLE `tbl_equipment` DISABLE KEYS */;
INSERT INTO `tbl_equipment` VALUES (1,'21','IASC1A','ConditionText1',0),(2,'21','IASC1B','ConditionText2',0),(3,'21','IASC1C','ConditionText3',0),(4,'21','IASC1D','ConditionText4',0),(5,'22','IASC1E','ConditionText5',0),(6,'22','IASC1G','ConditionText6',0),(7,'22','IASC1T','ConditionText7',0),(8,'22','GDC-L','ConditionText8',0),(9,'22','GDC-A','ConditionText9',0),(10,'22','GDC-V','ConditionText10',0),(11,'23','GDC-S','ConditionText11',0),(12,'23','GDC-R','ConditionText12',0),(13,'23','GDC-P','ConditionText13',0),(14,'23','GDC-M','ConditionText14',0),(15,'23','GDC-N','ConditionText15',0),(16,'23','GDC-O','ConditionText16',0);
/*!40000 ALTER TABLE `tbl_equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_part`
--

DROP TABLE IF EXISTS `tbl_part`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_part` (
  `id` varchar(191) COLLATE utf8mb4_bin NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_part`
--

LOCK TABLES `tbl_part` WRITE;
/*!40000 ALTER TABLE `tbl_part` DISABLE KEYS */;
INSERT INTO `tbl_part` VALUES ('part-1','Part1'),('part-2','Part2');
/*!40000 ALTER TABLE `tbl_part` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tbl_partloadlog`
--

DROP TABLE IF EXISTS `tbl_partloadlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tbl_partloadlog` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `created_at` datetime(3) DEFAULT NULL,
  `updated_at` datetime(3) DEFAULT NULL,
  `deleted_at` datetime(3) DEFAULT NULL,
  `rel_equipment_part_id` bigint unsigned NOT NULL,
  `load_status` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `load_progress` varchar(20) COLLATE utf8mb4_bin NOT NULL,
  `start_time` datetime(3) DEFAULT NULL,
  `elapsed_time` bigint unsigned DEFAULT NULL,
  `detail` varchar(200) COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_tbl_partloadlog_deleted_at` (`deleted_at`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tbl_partloadlog`
--

LOCK TABLES `tbl_partloadlog` WRITE;
/*!40000 ALTER TABLE `tbl_partloadlog` DISABLE KEYS */;
INSERT INTO `tbl_partloadlog` VALUES (1,'2024-06-19 09:56:36.629','2024-06-19 09:56:36.629',NULL,1,'Loaded','50','2024-06-19 09:56:36.629',30,'Initial load'),(2,'2024-06-19 09:56:36.629','2024-06-19 09:56:36.629',NULL,1,'Completed','100','2024-06-19 09:56:36.629',30,'Final load'),(3,'2024-06-19 09:56:36.630','2024-06-19 09:56:36.630',NULL,2,'Loaded','50','2024-06-19 09:56:36.630',30,'Initial load'),(4,'2024-06-19 09:56:36.630','2024-06-19 09:56:36.630',NULL,2,'Completed','100','2024-06-19 09:56:36.630',30,'Final load'),(5,'2024-06-19 09:56:36.631','2024-06-19 09:56:36.631',NULL,3,'Loaded','50','2024-06-19 09:56:36.631',30,'Initial load'),(6,'2024-06-19 09:56:36.631','2024-06-19 09:56:36.631',NULL,3,'Completed','100','2024-06-19 09:56:36.631',30,'Final load'),(7,'2024-06-19 09:56:36.631','2024-06-19 09:56:36.631',NULL,4,'Loaded','50','2024-06-19 09:56:36.631',30,'Initial load'),(8,'2024-06-19 09:56:36.631','2024-06-19 09:56:36.631',NULL,4,'Completed','100','2024-06-19 09:56:36.631',30,'Final load'),(9,'2024-06-19 09:56:36.632','2024-06-19 09:56:36.632',NULL,5,'Loaded','50','2024-06-19 09:56:36.632',30,'Initial load'),(10,'2024-06-19 09:56:36.632','2024-06-19 09:56:36.632',NULL,5,'Completed','100','2024-06-19 09:56:36.632',30,'Final load'),(11,'2024-06-19 09:56:36.632','2024-06-19 09:56:36.632',NULL,6,'Loaded','50','2024-06-19 09:56:36.632',30,'Initial load'),(12,'2024-06-19 09:56:36.632','2024-06-19 09:56:36.632',NULL,6,'Completed','100','2024-06-19 09:56:36.632',30,'Final load'),(13,'2024-06-19 09:56:36.633','2024-06-19 09:56:36.633',NULL,7,'Loaded','50','2024-06-19 09:56:36.633',30,'Initial load'),(14,'2024-06-19 09:56:36.633','2024-06-19 09:56:36.633',NULL,7,'Completed','100','2024-06-19 09:56:36.633',30,'Final load'),(15,'2024-06-19 09:56:36.633','2024-06-19 09:56:36.633',NULL,8,'Loaded','50','2024-06-19 09:56:36.633',30,'Initial load'),(16,'2024-06-19 09:56:36.633','2024-06-19 09:56:36.633',NULL,8,'Completed','100','2024-06-19 09:56:36.633',30,'Final load'),(17,'2024-06-19 09:56:36.634','2024-06-19 09:56:36.634',NULL,9,'Loaded','50','2024-06-19 09:56:36.634',30,'Initial load'),(18,'2024-06-19 09:56:36.634','2024-06-19 09:56:36.634',NULL,9,'Completed','100','2024-06-19 09:56:36.634',30,'Final load'),(19,'2024-06-19 09:56:36.634','2024-06-19 09:56:36.634',NULL,10,'Loaded','50','2024-06-19 09:56:36.634',30,'Initial load'),(20,'2024-06-19 09:56:36.634','2024-06-19 09:56:36.634',NULL,10,'Completed','100','2024-06-19 09:56:36.634',30,'Final load'),(21,'2024-06-19 09:56:36.635','2024-06-19 09:56:36.635',NULL,11,'Loaded','50','2024-06-19 09:56:36.635',30,'Initial load'),(22,'2024-06-19 09:56:36.635','2024-06-19 09:56:36.635',NULL,11,'Completed','100','2024-06-19 09:56:36.635',30,'Final load'),(23,'2024-06-19 09:56:36.635','2024-06-19 09:56:36.635',NULL,12,'Loaded','50','2024-06-19 09:56:36.635',30,'Initial load'),(24,'2024-06-19 09:56:36.635','2024-06-19 09:56:36.635',NULL,12,'Completed','100','2024-06-19 09:56:36.635',30,'Final load'),(25,'2024-06-19 09:56:36.636','2024-06-19 09:56:36.636',NULL,13,'Loaded','50','2024-06-19 09:56:36.636',30,'Initial load'),(26,'2024-06-19 09:56:36.636','2024-06-19 09:56:36.636',NULL,13,'Completed','100','2024-06-19 09:56:36.636',30,'Final load'),(27,'2024-06-19 09:56:36.636','2024-06-19 09:56:36.636',NULL,14,'Loaded','50','2024-06-19 09:56:36.636',30,'Initial load'),(28,'2024-06-19 09:56:36.636','2024-06-19 09:56:36.636',NULL,14,'Completed','100','2024-06-19 09:56:36.636',30,'Final load'),(29,'2024-06-19 09:56:36.637','2024-06-19 09:56:36.637',NULL,15,'Loaded','50','2024-06-19 09:56:36.637',30,'Initial load'),(30,'2024-06-19 09:56:36.637','2024-06-19 09:56:36.637',NULL,15,'Completed','100','2024-06-19 09:56:36.637',30,'Final load'),(31,'2024-06-19 09:56:36.637','2024-06-19 09:56:36.637',NULL,16,'Loaded','50','2024-06-19 09:56:36.637',30,'Initial load'),(32,'2024-06-19 09:56:36.637','2024-06-19 09:56:36.637',NULL,16,'Completed','100','2024-06-19 09:56:36.637',30,'Final load'),(33,'2024-06-19 09:56:36.638','2024-06-19 09:56:36.638',NULL,17,'Loaded','50','2024-06-19 09:56:36.638',30,'Initial load'),(34,'2024-06-19 09:56:36.638','2024-06-19 09:56:36.638',NULL,17,'Completed','100','2024-06-19 09:56:36.638',30,'Final load'),(35,'2024-06-19 09:56:36.638','2024-06-19 09:56:36.638',NULL,18,'Loaded','50','2024-06-19 09:56:36.638',30,'Initial load'),(36,'2024-06-19 09:56:36.638','2024-06-19 09:56:36.638',NULL,18,'Completed','100','2024-06-19 09:56:36.638',30,'Final load'),(37,'2024-06-19 09:56:36.639','2024-06-19 09:56:36.639',NULL,19,'Loaded','50','2024-06-19 09:56:36.639',30,'Initial load'),(38,'2024-06-19 09:56:36.639','2024-06-19 09:56:36.639',NULL,19,'Completed','100','2024-06-19 09:56:36.639',30,'Final load'),(39,'2024-06-19 09:56:36.639','2024-06-19 09:56:36.639',NULL,20,'Loaded','50','2024-06-19 09:56:36.639',30,'Initial load'),(40,'2024-06-19 09:56:36.639','2024-06-19 09:56:36.639',NULL,20,'Completed','100','2024-06-19 09:56:36.639',30,'Final load'),(41,'2024-06-19 09:56:36.640','2024-06-19 09:56:36.640',NULL,21,'Loaded','50','2024-06-19 09:56:36.640',30,'Initial load'),(42,'2024-06-19 09:56:36.640','2024-06-19 09:56:36.640',NULL,21,'Completed','100','2024-06-19 09:56:36.640',30,'Final load'),(43,'2024-06-19 09:56:36.640','2024-06-19 09:56:36.640',NULL,22,'Loaded','50','2024-06-19 09:56:36.640',30,'Initial load'),(44,'2024-06-19 09:56:36.640','2024-06-19 09:56:36.640',NULL,22,'Completed','100','2024-06-19 09:56:36.640',30,'Final load'),(45,'2024-06-19 09:56:36.641','2024-06-19 09:56:36.641',NULL,23,'Loaded','50','2024-06-19 09:56:36.641',30,'Initial load'),(46,'2024-06-19 09:56:36.641','2024-06-19 09:56:36.641',NULL,23,'Completed','100','2024-06-19 09:56:36.641',30,'Final load'),(47,'2024-06-19 09:56:36.641','2024-06-19 09:56:36.641',NULL,24,'Loaded','50','2024-06-19 09:56:36.641',30,'Initial load'),(48,'2024-06-19 09:56:36.641','2024-06-19 09:56:36.641',NULL,24,'Completed','100','2024-06-19 09:56:36.641',30,'Final load'),(49,'2024-06-19 09:56:36.642','2024-06-19 09:56:36.642',NULL,25,'Loaded','50','2024-06-19 09:56:36.642',30,'Initial load'),(50,'2024-06-19 09:56:36.642','2024-06-19 09:56:36.642',NULL,25,'Completed','100','2024-06-19 09:56:36.642',30,'Final load'),(51,'2024-06-19 09:56:36.642','2024-06-19 09:56:36.642',NULL,26,'Loaded','50','2024-06-19 09:56:36.642',30,'Initial load'),(52,'2024-06-19 09:56:36.642','2024-06-19 09:56:36.642',NULL,26,'Completed','100','2024-06-19 09:56:36.642',30,'Final load'),(53,'2024-06-19 09:56:36.643','2024-06-19 09:56:36.643',NULL,27,'Loaded','50','2024-06-19 09:56:36.643',30,'Initial load'),(54,'2024-06-19 09:56:36.643','2024-06-19 09:56:36.643',NULL,27,'Completed','100','2024-06-19 09:56:36.643',30,'Final load'),(55,'2024-06-19 09:56:36.643','2024-06-19 09:56:36.643',NULL,28,'Loaded','50','2024-06-19 09:56:36.643',30,'Initial load'),(56,'2024-06-19 09:56:36.643','2024-06-19 09:56:36.643',NULL,28,'Completed','100','2024-06-19 09:56:36.643',30,'Final load'),(57,'2024-06-19 09:56:36.644','2024-06-19 09:56:36.644',NULL,29,'Loaded','50','2024-06-19 09:56:36.644',30,'Initial load'),(58,'2024-06-19 09:56:36.644','2024-06-19 09:56:36.644',NULL,29,'Completed','100','2024-06-19 09:56:36.644',30,'Final load'),(59,'2024-06-19 09:56:36.645','2024-06-19 09:56:36.645',NULL,30,'Loaded','50','2024-06-19 09:56:36.645',30,'Initial load'),(60,'2024-06-19 09:56:36.645','2024-06-19 09:56:36.645',NULL,30,'Completed','100','2024-06-19 09:56:36.645',30,'Final load'),(61,'2024-06-19 09:56:36.645','2024-06-19 09:56:36.645',NULL,31,'Loaded','50','2024-06-19 09:56:36.645',30,'Initial load'),(62,'2024-06-19 09:56:36.645','2024-06-19 09:56:36.645',NULL,31,'Completed','100','2024-06-19 09:56:36.645',30,'Final load'),(63,'2024-06-19 09:56:36.646','2024-06-19 09:56:36.646',NULL,32,'Loaded','50','2024-06-19 09:56:36.646',30,'Initial load'),(64,'2024-06-19 09:56:36.646','2024-06-19 09:56:36.646',NULL,32,'Completed','100','2024-06-19 09:56:36.646',30,'Final load');
/*!40000 ALTER TABLE `tbl_partloadlog` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-19  9:57:25
