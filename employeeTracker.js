var mysql = require("mysql"); //import MySQL
var inquirer = require("inquirer");//import Inquirer

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port:3306,

  // Your username
  user: "root",

  // Your password
  password: "Oabc690218!",
  database: "top_songsDB"
});

connection.connect(function(err) {
    if (err) throw err;
    start();
});
  

// Build a command-line application that at a minimum allows the user to:
//   * Add departments, roles, employees
//   * View departments, roles, employees
//   * Update employee roles
function start() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View All Employees",
          "View All Employes by Department",
          "View All Employees by Manager",
          "Add Employee",
          "Remove Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "View All Roles",
          "Add Role",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "View All Employees":
          viewEmployees();
          break;
  
        case "View All Employes by Department":
          byDepartment();
          break;
  
        case "View All Employees by Manager":
          byManager();
          break;
  
        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":
          removeEmployee();
          break;

        case "Update Employee Role":
          updateRole();
          break;
          
        case "Update Employee Manager":
          updateManager();
          break;
        
        case "View All Roles":
          allRoles();
          break;
        
        case "Add Role":
          addRole();
          break;
  
        case "exit":
          connection.end();
          break;
        }
    });
}

function viewEmployees() {
    
}
function byDepartment() {
    inquirer
      .prompt({
        name: "department",
        type: "list",
        choices: ['Sales','Engineering', 'Finance', 'Legal'],
        message: "What department would you like to search for?"
    }) //.then(()=>{})
}
function byManager() {
    inquirer
      .prompt({
        name: "manager",
        type: "list",
        choices: [],
        message: "What manager would you like to search for?"
    }) //.then(()=>{})
}

function addEmployee() {
    inquirer
      .prompt({
        name: "firstName",
        type: "input",
        message: "What is the employee's first name?"
    },
    {
        name: "lastName",
        type: "input",
        message: "What is the employee's Last name?"
    },
    {
        name: "role",
        type: "list",
        choices:['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer','Account Manager', 'Accountant', 'Leagal Team Lead'],
        message: "What is the employee's role?"
    },
    {
        name: "manager",
        type: "list",
        choices: ['none'],
        message: "who is the employee's manager?"
    },
    ) 
}
function removeEmployee() {
    inquirer
      .prompt({
        name: "remove",
        type: "list",
        choices: [],
        message: "Which employee do you want to remove?"
    }) //.then(()=>{})
}
function updateRole() {
    inquirer
      .prompt({
        name: "role",
        type: "list",
        choices:['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer','Account Manager', 'Accountant', 'Leagal Team Lead'],
        message: "What is the employee's new role?"
    }) //.then(()=>{})
}

function updateManager() {
    inquirer
      .prompt({
        name: "managerUpdate",
        type: "list",
        choices:[],
        message: "Which employee's manager do you want to update?"
    }) //.then(()=>{})
}

function allRoles() {
  
}

function addRole() {
    inquirer
      .prompt({
        name: "employeeRole",
        type: "list",
        choices:[],
        message: "Which employee's role do you want to add?"
    },
    {
        name: "addRole",
        type: "list",
        choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer','Account Manager', 'Accountant', 'Leagal Team Lead'],
        message: "What role do you want to add?"
    }
    ) //.then(()=>{})
}