USE EmployeeTracker_DB;

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES ();

INSERT INTO department (name)
VALUES ("sales"), ("Engineering"), ("finance"), ("Legal"), ("Managment");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2),("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4), ("Manager, 100000", 5);