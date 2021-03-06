const mysql = require('mysql')
const inquirer = require('inquirer')
const util = require('util');
const { allowedNodeEnvironmentFlags } = require('process');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'trackerDB',
});

connection.query = util.promisify(connection.query)

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
                'View all departments',
                'Add department',
                'View all roles',
                'Add role',
                'Update employee roles',
                'EXIT'
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

                case 'View all departments':
                    viewDepartments();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Update employee roles':
                    updateRole();
                    break;

                case 'EXIT':
                    connection.end();
                    break;

                default:
                    console.log(`Invalid action: ${answer.action}`);
                    break;
            }
        })
}

const employeeSearch = () => {
    const query = 
        `SELECT employee.id, employee.first_name, employee.last_name, role.id AS role_id, role.title, role.salary, department.name AS department, department.id AS department_id, employee.manager_id
        FROM employee
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY employee.id;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('VIEW ALL EMPLOYEES')
        console.log('\n')
        console.table(res);
        runTracker();
    });
}

const departmentSearch = () => {
    const query =
        `SELECT employee.id, employee.first_name, employee.last_name, role.id AS role_id, role.title, role.salary, department.name AS department, department.id AS department_id, employee.manager_id
        FROM employee
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY department.id;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('VIEW ALL EMPLOYEES BY DEPARTMENT')
        console.log('\n')
        console.table(res);
        runTracker();
    });
}

const roleSearch = () => {
    const query = 
        `SELECT employee.id, employee.first_name, employee.last_name, role.id AS role_id, role.title, role.salary, department.name AS department, department.id AS department_id, employee.manager_id
        FROM employee
        INNER JOIN role ON (role.id = employee.role_id)
        INNER JOIN department ON (department.id = role.department_id)
        ORDER BY role.id;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('VIEW ALL EMPLOYEES BY ROLE')
        console.log('\n')
        console.table(res);
        runTracker();
    })
}

const addEmployee = () => {
    // query for all roles
}

const viewDepartments = () => {
    const query = 
        `SELECT department.name AS department, department.id AS department_id
        FROM department
        ORDER BY department.id;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('VIEW ALL DEPARTMENTS')
        console.log('\n')
        console.table(res);
        runTracker();
    })
}

const addDepartment = () => {
   
}

const viewRoles = () => {
    const query = 
        `SELECT role.title, role.id AS role_id
        FROM role
        ORDER BY role.id;`
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('VIEW ALL ROLES')
        console.log('\n')
        console.table(res);
        runTracker();
    })
}

const addRole = () => {
//    query all departments
}

const updateRole = async () => {
    const allEmployees = await connection.query (`SELECT * FROM employee`)
    const allRoles = await connection.query (`SELECT * FROM role`)
    const employeeChoices = allEmployees.map(person => {
        return {
            name: `${person.first_name} ${person.last_name}`,
            value: person.id
        }
    })
    const roleChoices = allRoles.map(role => {
        return {
            name: role.title,
            value: role.id
        }
    })
    const { employeeID, roleID } = await inquirer.prompt(
        [
            {
                name: 'employeeID',
                type: 'list',
                message: 'Choose employee to update role: ',
                choices: employeeChoices
            },
            {
                name: 'roleID',
                type: 'list',
                message: 'Choose new role: ',
                choices: roleChoices
            }
        ]
    )
    await connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleID, employeeID])
    console.log('SUCCESSFULLY UPDATED EMPLOYEE')
    runTracker();
}