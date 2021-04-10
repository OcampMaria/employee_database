const inquirer = require("inquirer");
const connection = require("./connection");

const role = [
  "Sales Lead",
  "Salesperson",
  "Lead Engineer",
  "Software Engineer",
  "Accountant",
  "Legal Team Lead",
  "Lawyer",
  "Manager",
];
const managers = ["sam", "none"];
const department = ["Sales", "Engineering", "Finance", "Legal"];

const search = () => {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees", //select all
        "View All Roles", //select roles only
        "view Departments",
        "Add Employee", //insert into
        "Add Department",
        "Add Role", //insert into
        "Update Employee Role", // update, set, where
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;
        case "View All Roles":
          allRoles();
          break;
        case "view Departments":
          viewDepartments();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Update Employee Role":
          updateRole();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
};
search();

// View all employees
const viewEmployees = () => {
  connection.query("select * from employee").then((data) => {
    console.table(data);
    search();
  });
};

const allRoles = () => {
  //diplays all the existing roles
  connection.query("select * from role").then((data) => {
    console.table(data);
    search();
  });
};

function viewDepartments() {
  // displays all departments in DB
  connection.query("select * from department").then((data) => {
    console.table(data);
    search();
  });
}

const addEmployee = () => {
  //adds new employees
  inquirer
    .prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the employee's Last name?",
      },
      {
        name: "role_id",
        type: "list",
        choices: role,
        message: "What is the employee's role?",
      },

      {
        name: "manager",
        type: "list",
        choices: managers,
        message: "who is the employee's manager?",
      },
    ])
    .then((answer) => {
      console.log(answer);

      const managers = ["none"];

      for (i = 0; i < role.length; i++) {
        if (answer.role_id === role[i]) {
          answer.role_id = i + 1;
          console.log(answer.role_id, "roleID");
        }
      }

      if (answer.role_id === 8) {
        managers.push(`${answer.firstName} ${answer.lastName}`);
        //every time I push to the array, the names do not append, they replace the last added name. and the managerID does not appear on the database
        console.log(managers);
        for (i = 0; i < managers.length; i++) {
          if (answer.manager === managers[i]) {
            answer.manager = i + 1;
            console.log(answer.manager, "managerID");
          }
        }
      }
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answer.firstName,
          last_name: answer.lastName,
          role_id: answer.role_id,
          manager_id: answer.manager_id,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          console.log("you added a new employee to your database!");
          search();
        }
      );
    });
};

const addRole = () => {
  //adds new roles
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the role Title?",
      },
      {
        name: "salary",
        type: "input",
        message: "What is the role's salary?",
      },
      {
        name: "department_id",
        type: "input",
        choices: department,
        message: "Choose a department id.",
      },
    ])
    .then((answer) => {
      console.log(answer);

      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.department_id,
        },
        (err, res) => {
          if (err) throw err;
          console.table(res);
          console.log("you added a new role to your database!");
          search();
        }
      );
    });
};

function addDepartment() {
  // adds new depts
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the department's name?",
      },
    ])
    .then((data) => {
      connection.query("INSERT INTO department SET ?", data).then(() => {
        console.log("a new department has been added!");
        search();
      });
    });
}

function updateRole() {
  connection
    .query(
      "select employee.id employeeID, role.id roleID, employee.first_name, employee.last_name, role.title from employee  LEFT JOIN role on role.id = employee.role_id"
    )
    .then((data) => {
      let updateEmployee = data.map(
        (employee) => employee.first_name + " " + employee.last_name
      );
      let updateEmployeeRole = data.map((role) => role.title);
      inquirer
        .prompt([
          {
            type: "list",
            message: "Select an employee to update their role",
            choices: updateEmployee,
            name: "employee",
          },
          {
            type: "list",
            message: "Select the employee's new role",
            choices: updateEmployeeRole,
            name: "role",
          },
        ])
        .then(function (response) {
          console.table(response);
          const employeeObj = data.find(
            (employee) =>
              employee.first_name + " " + employee.last_name ===
              response.employee
          );
          const employeeRoleObject = data.find(
            (role) => role.title === response.role
          );

          const query = "UPDATE employee SET ? WHERE ?";

          connection.query(
            query,
            [
              {
                role_id: employeeRoleObject.roleID,
              },
              {
                id: employeeObj.employeeID,
              },
            ],

            (err, res) => {
              if (err) throw err;
            }
          );

          console.log(response.employee + "'s role has been updated.");
          search();
        });
    });
}
