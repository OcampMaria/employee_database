const inquirer = require("inquirer");

// Build a command-line application that at a minimum allows the user to:
//   * Add departments, roles, employees
//   * View departments, roles, employees
//   * Update employee roles
const runSearch = () => {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees", //select all
      "View All Employes by Department",//select all where.depends on department id
      "View All Employees by Manager",//select all where. depends on manager id. 
      "Add Employee",//insert into
      "Remove Employee", //delete from where
      "Update Employee Role",// update, set, where
      "Update Employee Manager",
      "View All Roles",//select roles only
      "Add Role",//insert into
      "Exit"
    ]
  }).then(function(answer) {
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
  }});
}
module.exports = runSearch();

const viewEmployees = () => {
  //will display employee table on console
  connection.query ("SELECT * FROM employee"), (err, result)=>{
    if (err) throw err;
    console.log(result);
  }
  runSearch();
}

const byDepartment = () => {
  //display employees by department 
  inquirer.prompt({
    name: "department",
    type: "list",
    choices: ['Sales','Engineering', 'Finance', 'Legal'],
    message: "What department would you like to search for?"
  }).then((answer)=>{
    console.log(answer);
    connection.query ("SELECT * FROM department"), (err, result)=>{
      if (err) throw err;
      console.log(result);
    }
    runSearch();
  })
}
const byManager = () => {
  //display employees by manager
  inquirer.prompt({
    name: "manager",
    type: "list",
    choices: [],
    message: "What manager would you like to search for?"
  }).then(()=>{
    runSearch();
  })
}

const addEmployee=() => {
  //adds new employees
  inquirer.prompt([
    {
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
      name: "role_id",
      type: "list",
      choices:['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer','Account Manager', 'Accountant', 'Leagal Team Lead'],
      message: "What is the employee's role?"
    },
    {
      name: "manager",
      type: "list",
      choices: ['none'],
      message: "who is the employee's manager?"
    }
    ]).then((answer)=>{
      console.log(answer);
      connection.query("INSERT INTO employee SET ?", 
      {
        first_name:answer.firstName, 
        last_name: answer.lastName, 
        role: answer.role
      }, 
      (err)=>{
        if (err) throw err;
        console.log("you added a new employee to your database!");
        runSearch();
      }
      )
    })
  
}
const removeEmployee=() => {
  //removes employees from database
    inquirer
      .prompt({
        name: "remove",
        type: "list",
        choices: [],
        message: "Which employee do you want to remove?"
    }).then(()=>{

      runSearch();
    })
}
function updateRole() {
  //updates employee role on the database
  inquirer
    .prompt([
      {
        name: "employee",
        type: "list",
        choices:[],
        message: "Select the employee?"
      },
      {
        name: "role",
        type: "list",
        choices:['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer','Account Manager', 'Accountant', 'Leagal Team Lead'],
        message: "What is the employee's new role?"
    }
  ]).then(()=>{
    runSearch();
  })
}

const updateManager = () => {
  //updates employee's manager
    inquirer
      .prompt({
        name: "managerUpdate",
        type: "list",
        choices:[],
        message: "Which employee's manager do you want to update?"
    }).then(()=>{

      runSearch();
    })
}

const allRoles=() => {
  //diplays all the existing roles 
  runSearch();
}

const addRole= () => {
  //creates new role
    inquirer
      .prompt([{
        name: "roleTitle",
        type: "text",
        message: "What is the name of the role?"
    },
    {
        name: "salary",
        type: "text",
        // choices: ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer','Account Manager', 'Accountant', 'Leagal Team Lead'],
        message: "What is the role salary?"
    },
    {
      name: "depID",
      type: "text",
      message: "What is the department ID?"
    }]
    ).then((data)=>{
      console.log(data);
      runSearch();
    })
}