const inquirer = require('inquirer');
require('dotenv').config();
const { viewDepartments, addDepartment } = require('./scripts/department');
const { viewRoles, addRole } = require('./scripts/role'); // Import role functions

// Import other functionalities as needed

function startApp() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles', // Add 'View all roles' here
            'Add a department',
            'Add a role', // Add 'Add a role' here
            // ... other choices
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case 'View all departments':
            viewDepartments()
              .then((departments) => {
                console.table(departments);
                startApp();
              })
              .catch((err) => {
                console.error('Error:', err);
                startApp();
              });
            break;
          // Implement other cases for department-related actions here
          case 'View all roles':
            viewRoles()
              .then((roles) => {
                console.table(roles);
                startApp();
              })
              .catch((err) => {
                console.error('Error:', err);
                startApp();
              });
            break;
          case 'Add a role':
            // Logic to prompt for role details and call addRole function
            inquirer
              .prompt([
                {
                  type: 'input',
                  name: 'title',
                  message: 'Enter the title of the role:',
                },
                {
                  type: 'input',
                  name: 'salary',
                  message: 'Enter the salary for the role:',
                },
                {
                  type: 'input',
                  name: 'departmentId',
                  message: 'Enter the department ID for the role:',
                },
              ])
              .then((answers) => {
                addRole(answers.title, answers.salary, answers.departmentId)
                  .then(() => {
                    console.log('Role added successfully!');
                    startApp();
                  })
                  .catch((err) => {
                    console.error('Error:', err);
                    startApp();
                  });
              });
            break;
          // ... other cases
          case 'Exit':
          console.log('Exiting...');
          process.exit(0);
          break;
        default:
          console.log('Invalid choice');
          startApp();
          break;
        }
      })
      .catch((err) => {
        console.error('Error:', err);
        startApp();
      });
  }
  
  // Start the application
  startApp();