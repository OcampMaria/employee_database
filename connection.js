const mysql = require("mysql"); //import MySQL
const runSearch = require("./employeeTracker");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port:3306,

  // Your username
  user: "root",

  // Your password
  password: "Oabc690218!",
  database: "EmployeeTracker_DB"
});

connection.connect( (err) => {
    if (err) throw err;
    runSearch();
});
