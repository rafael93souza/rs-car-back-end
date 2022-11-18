CREATE DATABASE rs_car;

CREATE TABLE
    administrador (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(300) NOT NULL,
        status BOOLEAN default(true)
    );

CREATE TABLE
    vendedores (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        cpf VARCHAR(11) UNIQUE NOT NULL, 
        status BOOLEAN default(true)
    );

CREATE TABLE
    carros(
        id SERIAL PRIMARY KEY,
        marca VARCHAR(50) NOT NULL,
        modelo VARCHAR(100) NOT NULL,
        ano VARCHAR(4) NOT NULL,
        placa VARCHAR(8),
        preco integer NOT NULL,
        status BOOLEAN default(true)
    );

CREATE TABLE
    vendas(
        id SERIAL PRIMARY KEY,
        vendedor_id INTEGER NOT NULL,
        carro_id INTEGER NOT NULL,
        data TIMESTAMP NOT NULL,
        valor INTEGER NOT NULL, 
        status BOOLEAN default(true),
        FOREIGN KEY (vendedor_id) REFERENCES vendedores (id),
        FOREIGN KEY (carro_id) REFERENCES carros (id)
    );