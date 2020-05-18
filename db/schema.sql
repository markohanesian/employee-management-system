DROP DATABASE IF EXISTS employeemgmt_db;

CREATE DATABASE employeemgmt_db;

USE employeemgmt_db;

CREATE TABLE department (
	id INT IDENTITY PRIMARY KEY,
	dept_name VARCHAR(30) NOT NULL,
);

CREATE TABLE role (
  id INT IDENTITY PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(8,2) NULL,
  department_id INT
);

CREATE TABLE employee (
  id INT IDENTITY PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT NULL
);