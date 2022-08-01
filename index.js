const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./db');
require('console.table');

init();

function init() {
  const logoText = logo({ name: 'Employee Manager' }).render();

  console.log(logoText);

  loadMainPrompts();
}

// Put prompts here
function loadMainPrompts() {
    prompt([
        {
        type: 'list',
        name: 'choice',
        message: "What would you like to do?",
        choices: [
            {
                name: 'view all employees',
                value: 'VIEW_EMPLOYEES',
            },
        ],
    }
    ],
    );
}

// Switch cases