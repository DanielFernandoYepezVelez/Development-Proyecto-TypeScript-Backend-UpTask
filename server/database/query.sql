/* CONCEPTOS DDL MEJOR APLICADOS HASTA EL MOMENTO, SIRVE DE REFERENCIA PARA LA CREACIÓN DE NUEVAS BASES DE DATOS */
CREATE DATABASE uptask;

USE uptask;

CREATE TABLE IF NOT EXISTS users (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (20) NOT NULL,
    password VARCHAR (10) NOT NULL,
    email VARCHAR (50) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL DEFAULT 'USER_ROLE',
    img VARCHAR(70) NULL,
    google INT NULL DEFAULT 0,
    state INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

/* Alterando La Password Por Que Al Hashearla El String Es Mas Largo */
ALTER TABLE users
MODIFY password VARCHAR (70) NOT NULL;

CREATE TABLE IF NOT EXISTS projects (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (20) NOT NULL,
    url VARCHAR (40) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_projects_users FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS tasks (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    task TEXT NOT NULL,
    state INT NOT NULL DEFAULT 0,
    project_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_tasks_projects FOREIGN KEY (project_id) REFERENCES projects (id)
) ENGINE = MyISAM DEFAULT CHARSET = utf8mb4;