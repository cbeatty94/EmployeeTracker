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
}