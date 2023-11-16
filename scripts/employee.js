const connection = require('../config/connections');

// Function to view all employees
function viewEmployees() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT employee.id, employee.first_name, employee.last_name, 
      role.title AS job_title, role.salary, department.name AS department, 
      CONCAT(manager.first_name, ' ', manager.last_name) AS manager
      FROM employee
      INNER JOIN role ON employee.role_id = role.id
      INNER JOIN department ON role.department_id = department.id
      LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    `;
    connection.query(query, (err, employee) => {
      if (err) {
        reject(err);
      } else {
        resolve(employee);
      }
    });
  });
}

// Function to add an employee
function addEmployee(firstName, lastName, roleId, managerId) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    connection.query(query, [firstName, lastName, roleId, managerId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

function fetchEmployeesFromDatabase() {
  return new Promise((resolve, reject) => {
    // Implement logic to fetch employees from your database
    // Replace this with your actual database query
    const query = 'SELECT id, first_name AS firstName, last_name AS lastName FROM employee';
    connection.query(query, (err, employee) => {
      if (err) {
        reject(err);
      } else {
        resolve(employee);
      }
    });
  });
}
function updateEmployee(employeeId, newFirstName, /* Add other updated fields as parameters */) {
  return new Promise((resolve, reject) => {
    // Implement the SQL UPDATE query to update the employee's information
    const query = `
      UPDATE employee
      SET first_name = ? /* Update other fields as needed */
      WHERE id = ?
    `;
    connection.query(query, [newFirstName, employeeId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
function updateEmployeeRole(employeeId, newRoleId) {
  return new Promise((resolve, reject) => {
    const query = 'UPDATE employee SET role_id = ? WHERE id = ?';
    connection.query(query, [newRoleId, employeeId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
module.exports = {
  fetchEmployeesFromDatabase,
  updateEmployee,
  viewEmployees,
  addEmployee,
  updateEmployeeRole
};