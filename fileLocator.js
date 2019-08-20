/* eslint-disable quotes */
const fs = require("fs");
const path = require("path");

const filesToSkip = [
  ".DS_Store",
  ".babelrc",
  ".editorconfig",
  ".esslintrc.json",
  ".git",
  ".github",
  ".gitignore",
  ".prettierignore",
  ".prettierrc.yml",
  ".travis.yml",
  "CHANGELOG.md",
  "LICENSE",
  "README.md",
  "node_modules",
  "package-lock.json",
  "package.json",
  "secrets.js",
  "webpack.config.js"
];

let fileArray = [];

// function will return only the files found in directory based on project path

const locateDirectoryFiles = directoryPath => {
  const filesInDirectory = fs.readdirSync(directoryPath, "utf8");

  filesInDirectory.forEach(file => {
    const skippedFiles = filesToSkip.indexOf(file) > -1;

    let currentFile = directoryPath + "/" + file;

    if (!skippedFiles && fs.statSync(currentFile).isFile()) {
      fileArray.push(currentFile);
    } else if (!skippedFiles) {
      let currentDirectory = path.join(directoryPath + "//" + file);
      locateDirectoryFiles(currentDirectory);
    }
  });
  return fileArray;
};

const callbackFunc = (error, content) => {
  if (error) {
    console.error(error);
  } else {
    console.log("content", content);
  }
};

locateDirectoryFiles("/Users/taylorthompson/vim-city");

//function that will return the modules needed for project found in the package.json file

const requiredModules = (directoryPath, callback) => {
  const modules = fs.readFile(`${directoryPath}/package.json`, function(
    error,
    data
  ) {
    if (error) {
      console.error(error);
    } else {
      let moduleObject = JSON.parse(data);
      callback(null, moduleObject.dependencies);
    }
  });
  return modules;
};

// requiredModules("/Users/taylorthompson/vim-city", callbackFunc);
