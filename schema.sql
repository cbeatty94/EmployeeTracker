DROP DATABASE IF EXISTS trackerDB;
CREATE DATABASE trackerDB;
USE trackerDB;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id INT NOT NULL,
    CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);

INSERT INTO department (name)
VALUES ('Sales'),
('Engineering'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 110000, 2),
('Legal Team Lead', 180000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES ('Burke', 'Beatty', 1, NULL),
('Emmett', 'Rushtin', 2, 1),
('Luke', 'Spang', 3, 1),
('Thomas', 'Maxey', 4, 1),
('Emma', 'Watson', 5, NULL);

