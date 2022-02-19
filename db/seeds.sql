
INSERT INTO department
  (dep_name)
VALUES
  ('Sales'),
  ('Developer'),
  ('Finance'),
  ('Legal');

INSERT INTO role_table
  (title, salary, department_id  )
VALUES
  ('Salesperson', 80000.00, 1 ),
  ('Sales Lead', 120000.00, 1 ),
  ('Lead Developer', 130000.00, 2),
  ('Software Developer', 100000.00, 2),
  ('Senior Accountant', 110000.00, 3),
  ('Accountant', 70000.00, 3),
  ('Legal Team Lead', 130000.00, 4),
  ('Lawyer', 100000.00, 4);



INSERT INTO employees
  (first_name, last_name, role_id, manager_id)
VALUES
  ('Ned', 'Stark', 2, NULL ),
  ('Rob', 'Jones', 1, 1 ),
  ('Jon', 'Snow', 3, NULL ),
  ('Aria', 'Jones', 4, 3 ),
  ('Jon', 'Smith', 5, NULL),
  ('Phil', 'Smith', 6, 5),
  ('James', 'Chan', 1, 4),
  ('William', 'Shaw', 7, NULL),
  ('Andy', 'Cooper', 8, 8);
  
 