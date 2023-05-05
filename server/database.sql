CREATE DATABASE perntodo;

CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);