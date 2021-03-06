const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "marksql#15",
  database: "employeemgmt_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  updateEmpDb();
});


function updateEmpDb() {
    inquirer
      .prompt([{
          type: "list",
          name: "Menu",
          message: "What would you like to do?",
          choices: ["Add Department","Add Employee", "Add Role", "View Departments", "View Roles", "View Employees", "Update Employee Roles"],
        }
      ])
      .then(answers => {
        // adding if else statements for menu selection
       switch (answers.Menu){
         case "Add Department":
           addDepartment();
           break;
          case "Add Employee":
            addEmployee();
            break;
          case "Add Role":
            addRole();
            break;
          case "View Departments":
            viewDepartments();
            break;
          case "View Roles":
            viewRoles();
            break;
          case "View Employees":
            viewEmployees();
            break;
          case "Update Employee Roles":
            UpdateEmployeeRoles();
            break;
          default:
            updateEmpDb();
       }
      })
      .catch(error => {
        if (error.isTtyError) {
          // Prompt couldn't be rendered in the current environment
        } else {
          // Something else when wrong
        }
      });
  }

function viewDepartments(){
  con.query("SELECT * FROM department", function (err, result) {
    if (err) throw err;
    console.table(result);
  });

  }

 function viewRoles(){
  con.query("SELECT * FROM role", function (err, result) {
    if (err) throw err;
    console.table(result);
  });

 }


//  function to add roles
 function addRole(){
   let questions = [
     {
       name: "id",
       type: "input",
       message:"what is the role id?"
       
     },
     {
      name: "title",
      type: "input",
      message:"what is the title?"
      
    },
    {
      name: "salary",
      type: "input",
      message:"what is the salary?"
      
    },
    {
      name: "department_id",
      type: "input",
      message:"what is the department id?"
      
    }

    ]
  inquirer
  .prompt(questions)
  .then(answers => {

    let sql = `INSERT INTO role (id, title, salary, department_id) VALUES (${answers.id}, ${answers.title},${answers.salary}, ${answers.department_id})`

   

        var id = parseInt(answers.id);
        var title = answers.title;
        var salary = parseFloat(answers.salary);
        var department_id = parseInt(answers.department_id);
        con.query(
            "INSERT INTO role (id, title, salary, department_id) VALUES (?,?,?,?)",
            [
                id,
                title,
                salary,
                department_id
            ],
            function (err) {
               if (err) throw err;
               console.log("Role has been added!")
            })

  })
 }
 
//  function to add departments - GETTTING ERRORS HERE----------------------------------------------------------------------<<<<<<<<<<<<<<<<<<<<<<<
function addDepartment(){
  let questions = [
    {
      name: "id",
      type: "input",
      message:"Enter the department id"
      
    },
   {
     name: "dept_name",
     type: "input",
     message:"Enter the department name"
     
   }

   ]
 inquirer
 .prompt(questions)
 .then(answers => {

  //  let sql = `INSERT INTO department (id, dept_name) VALUES (${answers.id}, ${answers.dept_name})`
   let sql = `INSERT INTO department (id, dept_name) VALUES (2, "management")`

  

       var id = parseInt(answers.id);
       var deptName = parseInt(answers.dept_name);
       console.log(id, deptName)
       
       con.query(
           "INSERT INTO department (id, dept_name) VALUES (?,?)",
           [
               id,
               deptName
           ],
           function (err) {
              if (err) throw err;
              console.log("Department has been added!")
           })

 })

 //  function to add employee
function addEmployee(){
  let questions = [
    {
      name: "id",
      type: "input",
      message:"Enter the employee id"
      
    },
    {
      name: "first_name ",
      type: "input",
      message:"Enter the first name of employee"
      
    },
    {
      name: "last_name",
      type: "input",
      message:"Enter the last name of employee"
      
    },
    {
      name: "role_id",
      type: "input",
      message:"Enter the role id of employee"
      
    },
    {
      name: "manager_id",
      type: "input",
      message:"Enter the manager id of employee"
      
    }
  
   ]
 inquirer
 .prompt(questions)
 .then(answers => {

   let sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${answers.id}, ${answers.dept_name})`

  

       var id = parseInt(answers.id);
       var firstName = parseInt(answers.first_name);
       var lastName = parseInt(answers.last_name);
       var roleId = parseInt(answers.role_id);
       var managerId = parseInt(answers.manager_id);
       con.query(
           "INSERT INTO department (id, first_name, last_name, role_id, manager_id) VALUES (?,?,?,?,?)",
           [
               id,
               firstName,
               lastName,
               roleId,
               managerId
           ],
           function (err) {
              if (err) throw err;
              console.log("Department has been added!")
           })

 })


  
 function UpdateEmployeeRoles(){
  let questions = [
    {
      name: "id",
      type: "input",
      message:"What is the name of the employee you would like to update?"
      
    },
    {
      name: "id",
      type: "input",
      message:"What is the new role of the employee?"
      
    },
       
   ]
 inquirer
 .prompt(questions)
 .then(answers => {

   let sql = `UPDATE employee SET role=${answers.role} where first_name=${answers.first_name} and last_name=${answers.last_name})`

  

        var firstName = parseInt(answers.first_name);
        var lastName = parseInt(answers.last_name);
       con.query(
           "INSERT INTO role (first_name, last_name,) VALUES (?,?)",
           [
              firstName,
              lastName,
           ],
           function (err) {
              if (err) throw err;
              console.log("Role has been added!")
           })

 })
}

 }
  

