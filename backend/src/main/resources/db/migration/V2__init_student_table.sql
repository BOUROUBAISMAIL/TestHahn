-- Create student table
CREATE TABLE Student (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    age INTEGER
);

-- Insert sample students
INSERT INTO Student (first_name, last_name, email, age) VALUES
('Ismail', 'Bourouba', 'ismail@example.com', 24),
('Sara', 'El Khayat', 'sara.khayat@example.com', 22),
('Youssef', 'Benali', 'youssef.benali@example.com', 23);
