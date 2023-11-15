const connection = require('../config/connections');

// Function to view all departments
function viewDepartments() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM department', (err, departments) => {
      if (err) {
        reject(err);
      } else {
        resolve(departments);
      }
    });
  });
}

// Function to add a department
function addDepartment(departmentName) {
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO department (name) VALUES (?)', [departmentName], (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = { viewDepartments, addDepartment };