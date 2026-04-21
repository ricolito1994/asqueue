CREATE DATABASE IF NOT EXISTS asq_auth_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS asq_gate_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS asq_queue_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE DATABASE IF NOT EXISTS asq_notif_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'asqauth'@'%' IDENTIFIED WITH mysql_native_password BY 'authpassword';
GRANT ALL PRIVILEGES ON asq_auth_db.* TO 'asqauth'@'%';

CREATE USER IF NOT EXISTS 'asqgate'@'%' IDENTIFIED WITH mysql_native_password BY 'asqgatepass';
GRANT ALL PRIVILEGES ON asq_gate_db.* TO 'asqgate'@'%';

CREATE USER IF NOT EXISTS 'asqqueue'@'%' IDENTIFIED WITH mysql_native_password BY 'asqqpass';
GRANT ALL PRIVILEGES ON asq_queue_db.* TO 'asqqueue'@'%';

CREATE USER IF NOT EXISTS 'asqnotif'@'%' IDENTIFIED WITH mysql_native_password BY 'asqnotifpass';
GRANT ALL PRIVILEGES ON asq_notif_db.* TO 'asqnotif'@'%';

FLUSH PRIVILEGES;