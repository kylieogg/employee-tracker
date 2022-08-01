const connection = require("./connection");

class DB {
  // Class connection
  constructor(connection) {
    this.connection = connection;
  }

  // Basic format of all functions
  // Find all employees, connects roles and departments to show roles, salaries, departments, and managers
  findAllEmployees() {
    return this.connection.promise().query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  // Find all employees except ID
  findAllPossibleManagers(employeeId) {
  
   
  }

  // Create a new employee
  createEmployee(employee) {
  
  }

  // Update employee's role
  updateEmployeeRole(employeeId, roleId) {
  
   
  }

  // Find all roles, connect with departments to display the department name
  findAllRoles() {
   
  
  }

  // Create a new role
  createRole(role) {
    
  }

  // Find all departments
  findAllDepartments() {

  }

  // Find all departments, connect with employees and roles and give department budget
  viewDepartmentBudgets() {
  
  }

  // Create a new department
  createDepartment(department) {
   
  }
}

module.exports = new DB(connection);