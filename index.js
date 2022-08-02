const prompt = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');
require('console.table');
const express = require('express');
const { updateEmployeeRole, connection } = require('./db');
const inquirer = require('inquirer');

const app = express();


init();

function init() {
  const logoText = logo({ name: 'Employee Manager' }).render();

  console.log(logoText);
}

// Put prompts here
const promptMenu = () => {
    return inquirer.prompt([
        {
        type: 'list',
        name: 'menu',
        message: "What would you like to do?",
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Update an employee', 'Exit']
        }])
        .then(userChoice => {
            switch (userChoice.menu) { 
                
                case 'View all departments':
                    viewDepartments();
                    break;
                
                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Add a department':
                    addDepartment();
                    break;

                case 'Add a role':
                    addRole();
                    break;

                case 'Update an employee':
                    updateEmployeeRole();
                    break;
                
                default:
                    process.exit();
            }
        });
};


const viewDepartments = () => {
    db.findAllDepartments()
    .then(([results]) => {let departments=results;
        console.table(departments);
})
        .then(() => promptMenu())
};

const viewRoles = () => {
    db.findAllRoles()
    .then(([results]) => {let roles=results;
    console.table(roles);
})
    .then(() => promptMenu())
};

const viewEmployees = () => {
    db.findAllEmployees()
    .then(([results]) => { let employees=results;
    console.table(employees);
})
    .then(() => promptMenu())
};


function addDepartment () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What department would you like to add?'
        }])
    .then(function(answer) {
        console.log(answer);
        connection.query("INSERT INTO department SET?", 
        {name: answer.name}, 
        function(error) {
            if (error) throw error;
            console.log("added department");
        })
        promptMenu();
        })
};

function addRole () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What role would you like to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this new role?'
        },
        {
            type: 'input',
            name: 'department',
            message: 'What department is this new role in?'
        }
    ])
    .then(function(answer) {
        console.log(answer);
        connection.query('INSERT INTO roles SET?', {
            title: answer.title, salary: answer.salary, department_id: answer.department
        }, function(error) {
            if (error) throw error;
            console.log('added role');
        })
        promptMenu();
    })
};

function addEmployee () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the role ID of the employee?'
        },
        {
            type: 'input',
            name: 'manager',
            message: 'What is the manager ID of the employee?'
        }
    ])
    .then(function(answer) {
        console.log(answer);
        connection.query('INSERT INTO employee SET?', {
            first: answer.first, last: answer.last, id: answer.id, manager: answer.manager
        }, function(error) {
            if (error) throw error;
            console.log('added employee');
        })
        promptMenu();
    })
};

function updateRole () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'id',
            message: 'Which employee role is being updated?'
        },
        {
            type: 'input',
            name: 'title',
            message: 'What is the new role?'
        }
    ])
    .then(function(answer) {
        console.log(answer);
        connection.query('INSERT INTO roles SET?', {
            id: answer.id, title: answer.title
        }, function(error) {
            if (error) throw error;
            console.log('updated role');
        })
        promptMenu();
    })
};

promptMenu();



   
