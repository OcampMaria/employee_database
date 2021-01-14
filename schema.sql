DROP DATABASE IF EXISTS EmployeeTracker_DB;

CREATE database EmployeeTracker_DB;

USE EmployeeTracker_DB;

CREATE TABLE employee (
  position INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL, 
  role_id INT, 
  manager_id INT, 
  PRIMARY KEY (position)
);

CREATE TABLE department (
  position INT NOT NULL,
  department_name VARCHAR(30) NULL,
  PRIMARY KEY (position)
);

CREATE TABLE employee_role (
  position INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary  DECIMAL, 
  department_id INT, 
  PRIMARY KEY (position)
);

-- SELECT * FROM EmployeeTracker_DB;
