USE employee_db;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('james', 'leland', 1, NULL), -- Assuming the manager doesn't report to anyone
  ('josh', 'sal', 2, NULL),
  ('jack', 'krawl', 3, NULL);