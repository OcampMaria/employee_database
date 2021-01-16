const inquirer = require("inquirer");
const connection = require ("./connection");

const role = ['Sales Lead', 'Salesperson', 'Lead Engineer', 'Software Engineer','Accountant','Legal Team Lead', 'Lawyer', 'Manager']
const managers = ['sam', 'none'];
const department = ['Sales','Engineering', 'Finance', 'Legal'];


// Build a command-line application that at a minimum allows the user to:
//   * Add departments, roles, employees
//   * View departments, roles, employees
//   * Update employee roles
const search = () => {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees", //select all
      "View All Employes by Department",//select all where.depends on department id
      "Add Employee",//insert into
      "Remove Employee", //delete from where
      "Update Employee Role",// update, set, where
      "View All Roles",//select roles only
      "Add Role",//insert into
      "Exit"
    ]
  }).then(function(answer) {
    switch (answer.action) {
    case "View All Employees":
      viewEmployees();
      break;
    case "View All Employees by Department":
      byDepartment();
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
search ();


const viewEmployees = () => {
  //will display employee table on console
  const query = "SELECT * FROM employee";
  connection.query (query), (err, res)=>{
    console.log(res);
    if (err) throw err;
    console.table(res);
    search();
  };
}

const byDepartment = () => {
  //display employees by department 
  inquirer.prompt({
    name: "department",
    type: "list",
    choices: department,
    message: "What department would you like to search for?"
  }).then((answer)=>{
    console.log(answer);
    connection.query ("SELECT * FROM department"), (err, result)=>{
      if (err) throw err;
      console.log(result);
    }
    search();
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
      choices:role,
      message: "What is the employee's role?"
    },
    
    {
      name: "manager",
      type: "list",
      choices: managers,
      message: "who is the employee's manager?"
    }
    ]).then((answer)=>{
      console.log(answer);

      const managers= ['none'];

      for (i = 0; i < role.length; i++) {
        if(answer.role_id === role[i]){
          answer.role_id = i+1;
          console.log(answer.role_id, "roleID");
        } 
      };

      if(answer.role_id === 8){
        managers.push(`${answer.firstName} ${answer.lastName}`);
        //every time I push to the array, the names do not append, they replace the last added name. and the managerID does not appear on the database
        console.log(managers);
        for (i=0; i< managers.length;i++){
          if(answer.manager === managers[i]){
            answer.manager = i+1;
            console.log(answer.manager, "managerID");
  
          }
        }
      };    

     

     
      
      connection.query("INSERT INTO employee SET ?", 
      {
        first_name:answer.firstName, 
        last_name: answer.lastName, 
        role_id: answer.role_id,
        manager_id: answer.manager_id,
      }, 
      (err, res)=>{
        if (err) throw err;
        console.table(res)
        console.log("you added a new employee to your database!");
        search();
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

      search();
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
        choices: role,
        message: "What is the employee's new role?"
    }
  ]).then(()=>{
    search();
  })
}

const allRoles=() => {
  //diplays all the existing roles 
  search();
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
        message: "What is the role salary?"
    },
    {
      name: "depID",
      type: "text",
      message: "What is the department ID?"
    }]
    ).then((data)=>{
      console.log(data);
      search();
    })
}

