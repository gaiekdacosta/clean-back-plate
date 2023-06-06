#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");

const TEMPLATES_DIR = `${__dirname}/templates`;
const CHOICES = fs.readdirSync(TEMPLATES_DIR);
const CURRENT_DIR = process.cwd();
const NPM_IGNORE = '.npmignore';
const GIT_IGNORE = '.gitignore';

const QUESTIONS = [
    {
        name: "project-choice",
        type: "list",
        message: "Choose a template for backend:",
        choices: CHOICES
    },
    {
        name: "project-name",
        type: "input",
        message: "Project name:",
        validate: function(input) {
            if (/^([A-Za-z\-\_\d])+$/.test(input)) {
                return true;
            } else {
                return "Project name may only include letters, numbers, underscores, and hashes.";
            }
        }
    }
];

inquirer.prompt(QUESTIONS).then(answers => {
    const projectChoice = answers["project-choice"];
    const projectName = answers["project-name"];
    const templatePath = `${TEMPLATES_DIR}/${projectChoice}`;

    fs.mkdirSync(`${CURRENT_DIR}/${projectName}`);

    createDirectoryContents(templatePath, projectName);

    console.log('🎉 Project created successfully! 🎉');

    console.log(`📂 Directory structure
    └── src
        └── config
        └── controller
        └── middlewares
        └── models
        └── routes
            - index
        └── services
        └── utils
        - server
    - env
    - eslintrc
    - gitignore
    - tsconfig.json`);

    console.log(`✅ Now run:
    1. cd ${projectName}
    2. npm i (to install dependencies)
    3. npm start (to run the server)`)
});

const createDirectoryContents = (templatePath, newProjectPath) => {
    const filesToCreate = fs.readdirSync(templatePath);

    filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;
        const fileStats = fs.statSync(origFilePath);

        if (fileStats.isFile()) {
            let fileName = file;
            if (file === NPM_IGNORE) {
                fileName = GIT_IGNORE;
            }

            const writePath = `${CURRENT_DIR}/${newProjectPath}/${fileName}`;
            const contents = fs.readFileSync(origFilePath, "utf8");
            fs.writeFileSync(writePath, contents, "utf8");
        } else if (fileStats.isDirectory()) {
            fs.mkdirSync(`${CURRENT_DIR}/${newProjectPath}/${file}`);
            createDirectoryContents(
                `${templatePath}/${file}`,
                `${newProjectPath}/${file}`
            );
        }
    });
};