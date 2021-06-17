const mysql = require('mysql')
const inquirer = require('inquirer')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'trackerDB',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('connected!')
    
    runTracker();
});

const runTracker = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'View all employees',
                'View all employees by department',
                'View all employees by role',
                'Add employee',
                'Add department',
                'Add role',
                'Update employee roles'
            ]
        })
        .then((answer) => {
            switch (answer.action) {
                case 'View all employees':
                    employeeSearch();
                    break;

                case 'View all employees by department':
                    departmentSearch();
                    break;

                case 'View all employees by role':
                    roleSearch();
                    break;
                case 'Add employee':
                    addEmployee();
                    break;
                case 'Add department':
                    addDepartment();
                    break;
                case 'Add role':
                    addRole();
                    break;
                case 'Update employee roles':
                    updateRole();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
}

const employeeSearch = () => {
    const query = 
        `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, employee.manager_id
        FROM employee
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY employee.id;`
}