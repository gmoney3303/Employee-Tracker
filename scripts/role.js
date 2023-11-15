const connection = require('../config/connections');

// Function to view all roles
function viewRoles() {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT role.id, role.title, role.salary, department.name AS department
      FROM role
      INNER JOIN department ON role.department_id = department.id
    `;
    connection.query(query, (err, roles) => {
      if (err) {
        reject(err);
      } else {
        resolve(roles);
      }
    });
  });
}

// Function to add a role
function addRole(title, salary, departmentId) {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)';
    connection.query(query, [title, salary, departmentId], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { viewRoles, addRole };