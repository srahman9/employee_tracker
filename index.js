const mysql = require("mysql2");
const table = require("console.table");
const inquirer = require("inquirer");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "s0@ff7f0nvd2w0w",
  database: "srbusiness",
});

const promptUser = () => {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "what",
        message: "What do you want to view? (select only one to apply)",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "view all employees by Manager",
          "add a department",
          "add an employee",
          "update an employee role",
        ],
      },
    ])
    .then((choice) => {
      switch (choice.what) {
        case "view all departments":
          let queryString = "SELECT * from department";
          db.query(queryString, (error, result) => {
            if (error) {
              throw error;
            }
            console.table(result);
            promptUser();
          });
          break;
        case "view all roles":
          let queryString2 = "SELECT * from role_table";
          db.query(queryString2, (error, result) => {
            if (error) {
              throw error;
            }
            console.table(result);
            promptUser();
          });
          break;
        case "view all employees":
          let queryString3 = "SELECT * from employees";
          db.query(queryString3, (error, result) => {
            if (error) {
              throw error;
            }
            console.table(result);
            promptUser();
          });
          break;

        case "view all employees by Manager":
          let queryString5 =
            "SELECT count(id), manager_id from employees GROUP BY manager_id";
          db.query(queryString5, (error, result) => {
            if (error) {
              throw error;
            }
            console.table(result);
            promptUser();
          });
          break;

        case "add a department":
          return inquirer
            .prompt([
              {
                type: "input",
                name: "department_name",
                message: "Enter the new department name? (Required)",
                validate: (nameInput) => {
                  if (nameInput) {
                    return true;
                  } else {
                    console.log("Please enter the department name!");
                    return false;
                  }
                },
              },
            ])
            .then((params) => {
              let queryString4 = `INSERT INTO department (dep_name) VALUES (?)`;
              db.query(
                queryString4,
                params.department_name,
                (error, result) => {
                  if (error) {
                    throw error;
                  }
                  let queryString = "SELECT * from department";
                  db.query(queryString, (error, result) => {
                    if (error) {
                      throw error;
                    }
                    console.table(result);
                    promptUser();
                  });
                }
              );
            });

          break;
       
        //updating a role
        case "update an employee role":
          let queryString10 = "SELECT * from employees";
          let employeeArr = [];
          db.query(queryString10, (error, result) => {
            if (error) {
              throw error;
            }

            result.forEach((employee) => {
              employeeArr.push(employee.id + ". " + employee.first_name);
            });
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "update_role",
                  message: "Select the employee to update",
                  choices: employeeArr,
                },
              ])
              .then((params) => {
                console.log(params.update_role);
                let queryString11 = "SELECT * FROM role_table";
                let roleArr = [];
                db.query(queryString11, (roleErr, roleResult) => {
                  if (roleErr) throw roleErr;
                  roleResult.forEach((role) => {
                    roleArr.push(role.id + ".  " + role.title);
                  });

                  inquirer
                    .prompt([
                      {
                        type: "list",
                        name: "roleList",
                        message: "Select the new Role to update",
                        choices: roleArr,
                      },
                    ])
                    .then((roleData) => {
                      let roleId = roleData.roleList.split(".")[0];
                      let EmpId = params.update_role.split(".")[0];

                      let queryString4 = `Update employees set role_id = ? where id = ?`;
                      const allOfIt = [roleId, EmpId];

                      db.query(queryString4, allOfIt, (error, result) => {
                        if (error) {
                          throw error;
                        }
                        let queryString = "SELECT * from employees";
                        db.query(queryString, (error, result) => {
                          if (error) {
                            throw error;
                          }
                          console.table(result);
                          promptUser();
                        });
                      });
                    });
                });
              });

          });
          break;

        //adding new employee
        case "add an employee":
          return inquirer
            .prompt([
              {
                type: "input",
                name: "first_name",
                message: "Enter the first name? (Required)",
              },
              {
                type: "input",
                name: "last_name",
                message: "Enter the last name? (Required)",
              },
              {
                type: "input",
                name: "role_id",
                message: "Enter the new role id? (Required)",
              },
              {
                type: "input",
                name: "manager_id",
                message: "Enter the manager id? (Required)",
              },
            ])
            .then((params) => {
              let queryString4 = `INSERT INTO employees  (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)`;
              const allOfIt = [
                params.first_name,
                params.last_name,
                params.role_id,
                params.manager_id,
              ];
              console.log(allOfIt);
              db.query(queryString4, allOfIt, (error, result) => {
                if (error) {
                  throw error;
                }
                let queryString = "SELECT * from employees";
                db.query(queryString, (error, result) => {
                  if (error) {
                    throw error;
                  }
                  console.table(result);
                  promptUser();
                });
              });
            });

          break;
      }
    });
};
promptUser();
