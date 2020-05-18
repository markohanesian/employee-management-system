const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table');

function initApp() {
    //startHTML();
    updateEmpDb();
  }

function updateEmpDb() {
    inquirer
      .prompt([{
          type: "list",
          name: "Menu",
          message: "What would you like to do?",
          choices: ["Add", "View", "Update"],
        }
      ])
      .then(answers => {
        // adding if else statements for menu selection
        if (answers.Menu == 'Add') {
          addItem()
        }
        if (answers.Menu == 'View') {
          askIntern()
        }
        if (answers.Menu == 'Update') {
          askManager()
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

  function addItem(addSelect) {
    return inquirer.prompt([{
        type: "list",
        name: "Menu",
        message: "What would you like to add?",
        choices: ["Department", "Role", "Employee"],
    }]) .then(function(deptSelect) {
        if (deptSelect.choices === "Department") {
            updateEmpDb()
        }
    }
        
    )    
  }
  
initApp();
