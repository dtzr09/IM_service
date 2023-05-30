-- CREATE USER 'test'@'localhost';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' WITH GRANT OPTION;
-- GRANT ALL PRIVILEGES ON *.* TO 'username'@'localhost' WITH GRANT OPTION;
-- GRANT ALL PRIVILEGES ON *.* TO 'username'@'%'  WITH GRANT OPTION;

FLUSH PRIVILEGES;

CREATE DATABASE IF NOT EXISTS messaging_service;
USE messaging_service;

CREATE TABLE IF NOT EXISTS messages (
  message_id INT AUTO_INCREMENT PRIMARY KEY,
  chat VARCHAR(100) NOT NULL,
  sender VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  sendtime BIGINT NOT NULL
);
