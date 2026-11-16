CREATE DATABASE portfolio_db;
USE portfolio_db;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(100) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (login, senha) VALUES ('admin@senai', '18052008');
INSERT INTO usuarios (login, senha) VALUES ('admin@senai2', '123');