CREATE TABLE user_app (
  id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    login VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO user_app (first_name, last_name, login, password) VALUES
('Ismail', 'Bourouba', 'Test', '123456');

