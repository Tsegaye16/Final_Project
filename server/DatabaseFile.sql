use sample;
-- Create roles table
CREATE TABLE roles (
    role_id int NOT NULL AUTO_INCREMENT,
    role_name varchar(45) NOT NULL,
    PRIMARY KEY (role_id),
    UNIQUE KEY role_name_unique (role_name) -- Add a unique key for role_name
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create users table
CREATE TABLE users (
    user_id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    role_name varchar(255) DEFAULT NULL,
    birth_date datetime DEFAULT NULL,
    phone_number varchar(255) DEFAULT NULL,
    sex varchar(30) DEFAULT NULL,
    image varchar(255) DEFAULT NULL,
    PRIMARY KEY (user_id),
    UNIQUE KEY email_UNIQUE (email),
    KEY users_ibfk_1 (role_name),
    CONSTRAINT users_ibfk_1 FOREIGN KEY (role_name) REFERENCES roles (role_name)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create students table
CREATE TABLE students (
    student_id int NOT NULL AUTO_INCREMENT,
    user_id int DEFAULT NULL,
    PRIMARY KEY (student_id),
    UNIQUE KEY user_id (user_id),
    CONSTRAINT students_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create instructors table
CREATE TABLE instructors (
    instructor_id int NOT NULL AUTO_INCREMENT,
    user_id int DEFAULT NULL,
    PRIMARY KEY (instructor_id),
    UNIQUE KEY user_id (user_id),
    CONSTRAINT instructors_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create admins table
CREATE TABLE admins (
    admin_id int NOT NULL AUTO_INCREMENT,
    user_id int DEFAULT NULL,
    PRIMARY KEY (admin_id),
    UNIQUE KEY user_id (user_id),
    CONSTRAINT admins_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create reset_tokens table
CREATE TABLE reset_tokens (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(256) NOT NULL,
    token varchar(256) NOT NULL,
    expires bigint NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create email_confirmations table
CREATE TABLE email_confirmations (
    id int NOT NULL AUTO_INCREMENT,
    user_id int DEFAULT NULL,
    token varchar(255) NOT NULL,
    is_confirmed tinyint(1) DEFAULT '0',
    created_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    expires bigint DEFAULT ((UNIX_TIMESTAMP((NOW() + INTERVAL 1 HOUR)) * 1000)),
    PRIMARY KEY (id),
    KEY user_id (user_id),
    CONSTRAINT email_confirmations_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create quiz table
CREATE TABLE quiz (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(250) NOT NULL,
    description varchar(45) NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create question table
CREATE TABLE question (
    id int NOT NULL AUTO_INCREMENT,
    quiz_id int NOT NULL,
    question_number int NOT NULL,
    question_text varchar(256) NOT NULL,
    difficulty varchar(45) NOT NULL,
    mark int NOT NULL,
    PRIMARY KEY (id),
    KEY quiz_id_idx (quiz_id),
    CONSTRAINT quiz_id FOREIGN KEY (quiz_id) REFERENCES quiz (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Create choice table
CREATE TABLE choice (
    id int NOT NULL AUTO_INCREMENT,
    question_id int NOT NULL,
    choice_text varchar(256) NOT NULL,
    is_correct tinyint NOT NULL,
    PRIMARY KEY (id),
    KEY question_id_idx (question_id),
    CONSTRAINT question_id FOREIGN KEY (question_id) REFERENCES question (id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
