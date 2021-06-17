DROP DATABASE IF EXISTS trackerDB;
CREATE DATABASE trackerDB;
USE trackerDB;

-- Create tables

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

-- Insert values into tables

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
('Emma', 'Watson', 5, NULL),
('Bob', 'Johnson', 2, 1);

-- View all employees
SELECT employee.id, employee.first_name, employee.last_name, role.id AS role_id, role.title, role.salary, department.name AS department, department.id AS department_id, employee.manager_id
FROM employee
INNER JOIN role ON (role.id = employee.role_id)
INNER JOIN department ON (department.id = role.department_id)
ORDER BY employee.id;

-- View all employees by department
SELECT employee.id, employee.first_name, employee.last_name, role.id AS role_id, role.title, role.salary, department.name AS department, department.id AS department_id, employee.manager_id
FROM employee
INNER JOIN role ON (role.id = employee.role_id)
INNER JOIN department ON (department.id = role.department_id)
ORDER BY department.id;

-- View all employees by role
SELECT employee.id, employee.first_name, employee.last_name, role.id AS role_id, role.title, role.salary, department.name AS department, department.id AS department_id, employee.manager_id
FROM employee
INNER JOIN role ON (role.id = employee.role_id)
INNER JOIN department ON (department.id = role.department_id)
ORDER BY role.id;

-- View all departments
SELECT department.name AS department, department.id AS department_id
FROM department
ORDER BY department.id;

-- View all roles
SELECT role.title, role.id AS role_id
FROM role
ORDER BY role.id;