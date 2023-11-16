const inquirer = require('inquirer');
require('dotenv').config();
const { viewDepartments, addDepartment } = require('./scripts/department');
const { viewRoles, addRole } = require('./scripts/role'); // Import role functions
const { viewEmployees } = require('./scripts/employee'); // Import viewEmployees function
const { addEmployee } = require('./scripts/employee');
const { updateEmployeeRole } = require('./scripts/employee');
const { fetchEmployeesFromDatabase } = require('./scripts/employee');
const { fetchRolesFromDatabase } = require('./scripts/role');


// Import other functionalities as needed

function startApp() {
    inquirer
      .prompt([
        // Existing prompt choices ...
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all roles',
            'View all employees', // Add 'View all employees' here
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
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
            case 'Add a department':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'departmentName',
                message: 'Enter the name of the department:',
              },
            ])
            .then((answers) => {
              addDepartment(answers.departmentName)
                .then(() => {
                  console.log('Department added successfully!');
                  startApp(); // Restart the app after adding a department
                })
                .catch((err) => {
                  console.error('Error:', err);
                  startApp();
                });
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
                viewDepartments() // Fetch departments to populate choices
                  .then((departments) => {
                    const departmentChoices = departments.map((department) => ({
                      name: department.name,
                      value: department.id,
                    }));
              
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
                          type: 'list', // Change the input type to 'list'
                          name: 'departmentId',
                          message: 'Choose the department for the role:',
                          choices: departmentChoices, // Use department choices
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
                  })
                  .catch((err) => {
                    console.error('Error fetching departments:', err);
                    startApp();
                  });
              break;
              case 'View all employees':
          viewEmployees()
            .then((employees) => {
              console.table(employees);
              startApp();
            })
            .catch((err) => {
              console.error('Error:', err);
              startApp();
            });
          break;
          case 'Add an employee':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'firstName',
                message: 'Enter the employee\'s first name:',
              },
              {
                type: 'input',
                name: 'lastName',
                message: 'Enter the employee\'s last name:',
              },
              {
                type: 'input',
                name: 'roleId',
                message: 'Enter the employee\'s role ID:',
              },
              {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager\'s ID (if applicable):',
              },
            ])
            .then((employeeDetails) => {
              // Call addEmployee function with provided details
              addEmployee(
                employeeDetails.firstName,
                employeeDetails.lastName,
                employeeDetails.roleId,
                employeeDetails.managerId
              )
                .then(() => {
                  console.log('Employee added successfully!');
                  startApp();
                })
                .catch((err) => {
                  console.error('Error:', err);
                  startApp();
                });
            });
          break;
          case 'Update an employee role':
            fetchEmployeesFromDatabase()
            .then((employees) => {
              fetchRolesFromDatabase()
                .then((roles) => {
                  inquirer
                    .prompt([
                      {
                        type: 'list',
                        name: 'employeeId',
                        message: 'Choose the employee to update:',
                        choices: employees.map((employee) => ({
                          name: `${employee.firstName} ${employee.lastName}`,
                          value: employee.id,
                        })),
                      },
                      {
                        type: 'list',
                        name: 'newRoleId',
                        message: 'Choose the new role for the selected employee:',
                        choices: roles.map((role) => ({
                          name: role.title,
                          value: role.id,
                        })),
                      },
                    ])
                    .then((updateDetails) => {
                      updateEmployeeRole(updateDetails.employeeId, updateDetails.newRoleId)
                        .then(() => {
                          console.log('Employee role updated successfully!');
                          startApp();
                        })
                        .catch((err) => {
                          console.error('Error updating employee role:', err);
                          startApp();
                        });
                    });
                })
                .catch((err) => {
                  console.error('Error fetching roles:', err);
                  startApp();
                });
            })
            .catch((err) => {
              console.error('Error fetching employees:', err);
              startApp();
            });
        break;
    // case 'Update an employee role':
    // fetchEmployeesFromDatabase()
    //     .then((employees) => {
    //         fetchRolesFromDatabase() // Fetch roles to populate choices
    //             .then((roles) => {
    //                 inquirer.prompt([
    //                     // Prompt to select employee and new role
    //                     {
    //                         type: 'list',
    //                         name: 'employeeId',
    //                         message: 'Choose the employee to update:',
    //                         choices: employees.map((employee) => ({
    //                             name: `${employee.first_name} ${employee.last_name}`,
    //                             value: employee.id,
    //                         })),
    //                     },
    //                     {
    //                         type: 'list',
    //                         name: 'newRoleId',
    //                         message: 'Choose the new role for the selected employee:',
    //                         choices: roles.map((role) => ({
    //                             name: role.title,
    //                             value: role.id,
    //                         })),
    //                     },
    //                 ])
    //                 .then((updateDetails) => {
    //                     // Logic to update the employee role
    //                     // Use updateDetails.employeeId and updateDetails.newRoleId
    //                 });
    //             });
    //     })
    //     .catch((err) => {
    //         console.error('Error fetching employees:', err);
    //     });
    //  break;

          // ... other cases
          case 'Exit':
          console.log('Exiting...');
          process.exit(0);

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