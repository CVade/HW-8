const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const team = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

function app() {
    function createTeam() {
        inquirer.prompt([{
            name: "employee_type",
            type: "list",
            message: "Employee Type?",
            choices: ["Engineer", "Intern", "Exit"]
        }])
            .then(choice => {
                switch (choice.employee_type) {
                    case "Engineer":
                        createEngineer();
                        break;
                    case "Intern":
                        createIntern();
                        break;
                    default:
                        writeTeam();
                        break;
                }
            })
    }

    function writeTeam() {
        if (fs.existsSync(OUTPUT_DIR) === false) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(team), "utf-8")
    }

    function createManager() {
        inquirer.prompt([{
            name: "manager_name",
            type: "input",
            message: "What is your name?",
        },
        {
            name: "email_link",
            type: "input",
            message: "What is your email?",
        },
        {
            name: "id_number",
            type: "input",
            message: "What is your ID #?",
        },
        {
            name: "office_number",
            type: "input",
            message: "What is your Office #?",
        }
        ]).then((answers) => {
            const manager = new Manager(answers.manager_name, answers.id_number, answers.email_link, answers.office_number);
            team.push(manager);
            createTeam();
        })
    }

    function createEngineer() {
        inquirer.prompt([{
            name: "engineer_name",
            type: "input",
            message: "What is your name?",
        },
        {
            name: "email_link",
            type: "input",
            message: "What is your email?",
        },
        {
            name: "id_number",
            type: "input",
            message: "What is your ID #?",
        },
        {
            name: "github_id",
            type: "input",
            message: "What is your Github ID?",
        }
        ]).then((answers) => {
            const engineer = new Engineer(answers.engineer_name, answers.id_number, answers.email_link, answers.github_id);
            team.push(engineer);
            createTeam();
        })

    }
    function createIntern() {
        inquirer.prompt([{
            name: "intern_name",
            type: "input",
            message: "What is your name?",
        },
        {
            name: "email_link",
            type: "input",
            message: "What is your email?",
        },
        {
            name: "id_number",
            type: "input",
            message: "What is your ID #?",
        },
        {
            name: "school_name",
            type: "input",
            message: "What is your School's name?",
        }
        ]).then((answers) => {
            const intern = new Intern(answers.intern_name, answers.id_number, answers.email_link, answers.school_name);
            team.push(intern);
            createTeam();
        })
    }

    createManager();
}

app();