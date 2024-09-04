 START TRANSACTION;
  DROP TABLE IF EXISTS `User`;
  CREATE TABLE IF NOT EXISTS `User` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('USER', 'ADMIN') DEFAULT 'USER' NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
COMMIT;