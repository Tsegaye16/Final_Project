-- MySQL dump 10.13  Distrib 8.0.35, for Win64 (x86_64)
--
-- Host: localhost    Database: project
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Current Database: `project`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `project` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `project`;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `admins_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `choice`
--

DROP TABLE IF EXISTS `choice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `choice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `choice_text` varchar(256) NOT NULL,
  `is_correct` tinyint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `question_id_idx` (`question_id`),
  CONSTRAINT `question_id` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=136 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `choice`
--

LOCK TABLES `choice` WRITE;
/*!40000 ALTER TABLE `choice` DISABLE KEYS */;
INSERT INTO `choice` VALUES (120,42,'Stack',0),(121,42,'Queue',0),(122,42,'Linked list',1),(123,42,'Array',0),(124,43,'O(n^2)',0),(125,43,'O(log n)',1),(126,43,'O(1)',0),(127,43,'O(n)',0),(128,44,'Merge Sort',0),(129,44,'Quick Sort',0),(130,44,'Bubble Sort',1),(131,44,'Heap Sort',0),(132,45,'Array',0),(133,45,'Linked list',0),(134,45,'stack',1),(135,45,'Queue',0);
/*!40000 ALTER TABLE `choice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `elapsed_time`
--

DROP TABLE IF EXISTS `elapsed_time`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `elapsed_time` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poster_id` int NOT NULL,
  `duration` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `poster_id_idx` (`poster_id`),
  CONSTRAINT `poster_id` FOREIGN KEY (`poster_id`) REFERENCES `instructors` (`instructor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `elapsed_time`
--

LOCK TABLES `elapsed_time` WRITE;
/*!40000 ALTER TABLE `elapsed_time` DISABLE KEYS */;
INSERT INTO `elapsed_time` VALUES (2,12,1);
/*!40000 ALTER TABLE `elapsed_time` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_confirmations`
--

DROP TABLE IF EXISTS `email_confirmations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_confirmations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `is_confirmed` tinyint(1) DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expires` bigint DEFAULT ((unix_timestamp((now() + interval 1 hour)) * 1000)),
  PRIMARY KEY (`id`),
  KEY `email_confirmations_ibfk_1` (`user_id`),
  CONSTRAINT `email_confirmations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_confirmations`
--

LOCK TABLES `email_confirmations` WRITE;
/*!40000 ALTER TABLE `email_confirmations` DISABLE KEYS */;
INSERT INTO `email_confirmations` VALUES (26,46,'995d7ca9a94b5038385e53266a4fceba12611363',1,'2024-04-20 20:56:07',1713650167284),(32,47,'a3e847906f8e2890bfd6a49b466046bdc2837b62',0,'2024-04-20 21:26:24',1713657322900),(41,68,'ff92c6942b40b36562ae3c5763afba69ae35a705',0,'2024-05-11 16:57:31',1715450251140),(42,68,'50ae03eaa826b406b3926bd3ee426686749a0a57',0,'2024-05-11 16:57:31',1715450251149),(43,75,'a85e00abeda4b734dc63589ffa5fa424cddc2e89',0,'2024-05-11 17:06:41',1715450801404),(44,75,'0a37bb898f734a5241f1c6c8d07f4d541cc3a228',0,'2024-05-11 17:06:41',1715450801413),(45,77,'1f6ccb30c4d48d91ca48e65677359e0fb7fabf79',1,'2024-05-11 17:08:29',1715451808000),(46,77,'1f6ccb30c4d48d91ca48e65677359e0fb7fabf79',1,'2024-05-11 17:08:29',1715451808000),(47,78,'1ec46ba6f2f8ae2b5f52cde599a12df497e5555f',0,'2024-05-11 17:22:50',1715451770548),(48,78,'c6afb581e3fbf0a00096e4d30667f1e6906c771f',0,'2024-05-11 17:22:50',1715451770558),(49,80,'f518c39c092e95ce12f07dbb8e863d33b409ce94',0,'2024-05-11 17:24:50',1715451890973),(50,80,'c7a36c48ad491d98d8323142d173bdddd7adeedf',0,'2024-05-11 17:24:50',1715451890983),(51,81,'489fe738ace50e08147bd6692e6f99ccceecc08a',0,'2024-05-11 21:15:33',1715465810482),(52,81,'489fe738ace50e08147bd6692e6f99ccceecc08a',0,'2024-05-11 21:15:33',1715465810482);
/*!40000 ALTER TABLE `email_confirmations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instructors`
--

DROP TABLE IF EXISTS `instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `instructors` (
  `instructor_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`instructor_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `instructors_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instructors`
--

LOCK TABLES `instructors` WRITE;
/*!40000 ALTER TABLE `instructors` DISABLE KEYS */;
INSERT INTO `instructors` VALUES (12,9),(13,12);
/*!40000 ALTER TABLE `instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `note`
--

DROP TABLE IF EXISTS `note`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `note` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poster_id` int NOT NULL,
  `poster_role` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `note_text` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  PRIMARY KEY (`id`),
  KEY `poster_id_idx` (`poster_id`),
  CONSTRAINT `posters_id` FOREIGN KEY (`poster_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `note`
--

LOCK TABLES `note` WRITE;
/*!40000 ALTER TABLE `note` DISABLE KEYS */;
INSERT INTO `note` VALUES (3,13,'Student','linked-list','Students sample note 2. ጉድ በል ጎንደር አለ ያገሬ ሰው!!\n\n\n\n\n\n\n\n'),(7,9,'Instructor','linked-lists','goood'),(9,13,'Student','linked-list','This is another sample for adding new not'),(16,13,'Student','queue','ድፍስግ'),(17,9,'Instructor','queue','ጅላጅል ዝም ብለህ አትጃጃል'),(21,9,'Instructor','hash_table','sample hash'),(22,9,'Instructor','bst','sample about Binary Search Tree'),(25,13,'Student','linked-list','<h1><strong><em>How are you doing?</em></strong></h1>'),(27,13,'Student','graph','DFDGSD'),(29,13,'Student','merge_sort','yhjhkjl'),(30,13,'Student','merge_sort',';jlk hjl;k\'mgkj'),(31,13,'Student','merge_sort','djfok\'sdlre'),(32,9,'Instructor','bubble_sort','sample note about bubble sort.'),(35,13,'Student','bubble_sort','1. good news'),(37,13,'Student','bubble_sort','€ good bell gonder'),(59,9,'Instructor','linked-list','<pre class=\"ql-syntax\" spellcheck=\"false\">const sum = (a, b) =&gt; {\n    return a + b;\n}\n</pre>'),(60,9,'Instructor','linked-list','<pre class=\"ql-syntax ql-indent-2\" spellcheck=\"false\">ገነት አንዷአለም\nጸጋዬ አበዋ\nክፍሌ አስረስ\n</pre>'),(61,9,'Instructor','array','<p>ግድግ hfhjgj</p>');
/*!40000 ALTER TABLE `note` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `question`
--

DROP TABLE IF EXISTS `question`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_id` int NOT NULL,
  `question_number` int NOT NULL,
  `question_text` varchar(256) NOT NULL,
  `difficulty` varchar(45) NOT NULL,
  `mark` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_id_idx` (`quiz_id`),
  CONSTRAINT `quiz_id` FOREIGN KEY (`quiz_id`) REFERENCES `quiz` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question`
--

LOCK TABLES `question` WRITE;
/*!40000 ALTER TABLE `question` DISABLE KEYS */;
INSERT INTO `question` VALUES (42,43,1,'Which of the following data structures allows for efficient insertion and deletion at any position?','easy',3),(43,43,2,'The time complexity of searching for an element in a well-balanced Binary Search Tree is:','medium',4),(44,43,3,'Which of the following sorting algorithms is most efficient for a small dataset?','medium',3),(45,43,4,'A Depth-First Search (DFS) traversal of a graph visits all nodes connected to a particular node before moving on to the next node. What data structure is typically used to implement DFS?','hard',5);
/*!40000 ALTER TABLE `question` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poster_id` int NOT NULL,
  `name` varchar(250) NOT NULL,
  `description` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `poster_id_idx` (`poster_id`),
  CONSTRAINT `posterss_id` FOREIGN KEY (`poster_id`) REFERENCES `instructors` (`instructor_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
INSERT INTO `quiz` VALUES (43,12,'Tsegaye','alx sample'),(45,12,'SAMLE','GK;LU;L'),(46,12,'stack','stack question');
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reset_tokens`
--

DROP TABLE IF EXISTS `reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL,
  `token` varchar(256) NOT NULL,
  `expires` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_email_idx` (`email`),
  CONSTRAINT `user_email` FOREIGN KEY (`email`) REFERENCES `users` (`email`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reset_tokens`
--

LOCK TABLES `reset_tokens` WRITE;
/*!40000 ALTER TABLE `reset_tokens` DISABLE KEYS */;
INSERT INTO `reset_tokens` VALUES (1,'gedu@gmail.com','2e541dfd7f06bcd5452905ec31dcd5f4aecc42f3',1708819608024),(2,'gedu@gmail.com','be279ff4b6f2c9ed0f3f51b7756f75f9d18b4ef4',1708819644706),(3,'gedu@gmail.com','b36ad92a036e3aecd121b03bf5f5e98d6f2c75b3',1708819690649),(4,'gedu@gmail.com','ae6d3d09bc780757e735ee5d64903d52fd9e766d',1708819882188),(5,'gedu@gmail.com','32a493338ee8f6657550b09a3999d4cae23eefc1',1708820179184),(6,'gedu@gmail.com','b18dce8e526ba607a799738587f641de87e29051',1708820303595),(7,'gedu@gmail.com','2fc9c022013888d1f56ba493cf014be5dbf3f776',1708820349409),(8,'gedu@gmail.com','01dba9a9e5c442411b199e9392135065ce94f82a',1708820416453),(9,'gedu@gmail.com','0cb2979dd2f4210985f8e906eed5a316a05a925c',1708820461116),(10,'gedu@gmail.com','6fd0c7cb18f060a9477cb2b283716d17683663f0',1708820507895),(11,'gedu@gmail.com','17cc8cc32f6c8190489ba61d2dc04071ee5f19c9',1708820649990),(12,'gedu@gmail.com','e35629165aaa5334a3a655513073092c715759ed',1708820853615),(13,'gedu@gmail.com','93fd65c763a3d6ca30e0a76862de3fd4c8cb7ec9',1708820915216),(14,'gedu@gmail.com','3359681c1f677c060e4462d5961e5038a0d72843',1708821133599),(15,'gedu@gmail.com','0e50ac6b2dd24e8df9108bd99648b1c6779ca1de',1708821181162),(16,'gedu@gmail.com','160855c537f5f2a1c215bd798c07ec0fcca2ded5',1708821231200),(17,'gedu@gmail.com','9e18b59d0f5fe191143191221c715b5e514d380c',1708821794430),(18,'gedu@gmail.com','bbf106e079c72618b2f87de8b3026ece503f66f9',1708845452701),(19,'gedu@gmail.com','987956f95c261cbbc84c443a7b7d50b72a0a5223',1708846106657),(20,'robelaklilu100@gmail.com','1e4971aaf2856b678c7194c9ad322ba9777019dc',1708846246199),(21,'tsegayeabewa@gmail.com','26f4d2fb6a2054bdd26d833ea733f93951e574ae',1708846434997),(23,'tsegayeabewa@gmail.com','848a599ff9b581592d47fcb7a2c70401cbd6b950',1708862430805),(24,'kefleaseres19@gmail.com','d8ae6b401fe4a5abe93b1c047c974518d305c3d9',1708890077800);
/*!40000 ALTER TABLE `reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `students_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (15,11),(12,13),(13,17);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_message`
--

DROP TABLE IF EXISTS `user_message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_message` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `message` longtext NOT NULL,
  `is_viewed` tinyint(1) DEFAULT NULL,
  `is_replayed` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `iduser_message_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_message`
--

LOCK TABLES `user_message` WRITE;
/*!40000 ALTER TABLE `user_message` DISABLE KEYS */;
INSERT INTO `user_message` VALUES (1,'Tsegaye','abewatsegaye16@gmail.com','good night',NULL,1),(2,'Tsegaye','abewatsegaye16@gmail.com','good night',NULL,1),(3,'Tsegaye','abewatsegaye16@gmail.com','good night',NULL,1),(4,'ጸጋዬ','kefle@gmail.com','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',NULL,1),(5,'Genet','andualemgenet29@gmail.com','superb',NULL,1),(6,'Addisu','tsegayeabewa@gmail.com','is it correct?',NULL,1);
/*!40000 ALTER TABLE `user_message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_name` varchar(255) DEFAULT NULL,
  `birth_date` datetime DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `sex` varchar(30) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `users_ibfk_1` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (9,'Genet Andualem','genet@gmail.com','Genet16','$2b$10$RWJmE2L9hOsiHAYyfZASWOY1fdiKDF11k4rOdjeovpq3UBZpzk6uu','Instructor','2000-01-12 03:00:00','+251 99 521 3296','female','genet.jpg'),(11,'Tsemru ','tsemru@gmail.com','Tsemru16','$2b$10$XhesB6IO2u4RtwwfaY1yPeCi8g9GMcKfUn6LgccH8eaZFhWNQk7lG','Student',NULL,NULL,NULL,'conscience.jpg'),(12,'Robel','robel@gmail.com','Robel16','$2b$10$JxZNaj4bF5SHofsokUBjXuvYB/eXruOCHyvwSuNRxoQR.zUJ.ct9a','Instructor',NULL,NULL,NULL,'WIN_20240116_07_53_35_Pro.jpg'),(13,'Niwaz Nezif','niwaz@gmail.com','Niwaz16','$2b$10$007TA71e1MQ//Z5UA5qNtut.KjIcsrO/rNMx5.FsazSVWdT1Dpugq','Student','2000-02-15 03:00:00','+251 93 497 5438','male','Aboutback.png'),(15,'Endalew','abcd@gmail.com','henokb','$2b$10$O284fP4Pe8Ydbh/XtBcBxuYtIhavVhjiCvV6Eg.NrNRTP9FJIOmTW',NULL,NULL,NULL,NULL,NULL),(17,'አባዱላ ገመዳ','gemeda@gmail.com','ገመዳ','$2b$10$CpXe5rtxRFrapcZDbOc.ou.tTcwNXuhq.DNGPSkkcJh9hb/3QjJMC','Student',NULL,NULL,NULL,'áááµ ááá£ _ á áá° áá ááá _ Zenet Muhaba _ Ante lij nalegne _ á«áááá­á ááá á©.mp4'),(18,'ገዱ አንዳርጋቸው','gedu@gmail.com','gedu1234','$2b$10$rJsjLsJ51Ng9IkXVq41c8uBvP8TkffqUvohZV/bFDpCcSL4FT2G5G',NULL,NULL,NULL,NULL,NULL),(19,'Robel Aklilu','robelaklilu100@gmail.com','Robel','$2b$10$riTo0IVJ9yI3Vh.FMdMc2eXvuW2rzz3RHur9tehUC9WDI9EQKqUE.',NULL,NULL,NULL,NULL,NULL),(24,'ከፍ','kefleaseres19@gmail.com','tsega','$2b$10$R2IOJAIIjuDJ81Kl.wg/ueTGY5ORlcHKiOVX9AUbvHvn4ih9gd2c2',NULL,NULL,NULL,NULL,NULL),(33,'Tsegaye Abewa Chanie','tsegayeabewa@gmail.com','Tsegaye16','$2b$10$HqLngw.xIJIjNoLeXczwFO.UK/cv1Lk14TZxl.bdX8ygQz2Hn2QyC','Admin','2000-11-07 03:00:00','+251 99 521 3296','male','photo_2023-10-28_11-02-00.png'),(46,'Amare Abewa','abewatsegaye16@gmail.com','Amare','$2b$10$RJ/fis7kPsv0DLpxSi1SWuwhCy8wcPDeNmMGd9B54T7sYlfi6OWf2',NULL,NULL,NULL,NULL,NULL),(47,'Amare Abewa','abewatsegaye17@gmail.com','Amare','$2b$10$Pi6FbwacP2.vsWUGedABT.Z9aXqiurCT.bPNG6BUeNi0L8KQ9P3kS',NULL,NULL,NULL,NULL,NULL),(68,'amare','abewatsegaye@gmail.com','amare','$2b$10$Y6GDTuSkvSP2FhoTO4hDEeuhTyGZX0RUi/1yxUUjtAr/vrRE7KZcu',NULL,NULL,NULL,NULL,NULL),(75,'Amare Abewa','abewatseg@gmail.com','Amare','$2b$10$Cg24sniNrJUyTgTEMuq7tOYekcoeKJIAYkj9mORdxw6CL9T17V3W6',NULL,NULL,NULL,NULL,NULL),(77,'abcd','andualemgenet29@gmail.com','abcd','$2b$10$XwK.z7Tv9Kh3xjRSlIELlu/fsiz3hHQjP7MZUfwOXlb/E3kltH10u',NULL,NULL,'','','genet.jpg'),(78,'abcd','abcdefgh@gmail.com','abcd','$2b$10$59aWe7lgFz/eHnamMEgPZuMu51QKAzaWJPfpqzN9DGyKjGOEaOhtK',NULL,NULL,NULL,NULL,NULL),(80,'abcd','abcde@gmail.com','abcd','$2b$10$MWJgrxlDsxROJpIs8T1uKOmNO28MCvdf2W4TvRKkXVcjr07N7Nr9G',NULL,NULL,NULL,NULL,NULL),(81,'kefle','kifleasres83@gmail.com','kefle','$2b$10$dMJvGJNU.kKBMhfFTYSTVuNcuWXorpTiTFj7BfEdeRzKcc129ZhgC',NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'project'
--

--
-- Dumping routines for database 'project'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-13 17:16:17
