/* eslint-disable quotes */
const fs = require("fs");
const path = require("path");

//array of files to skip in directory
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

//initialize empty array to store filenames
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

locateDirectoryFiles("/Users/taylorthompson/vim-city");

//read package.json file to find the modules required for the project
const data = fs.readFileSync("/Users/taylorthompson/vim-city/package.json");

const obj = JSON.parse(data);

//store the keys from the dependencies section of package.json
let keys = Object.keys(obj.dependencies);

//function will filter through list of files found in directory and return the ones that contain the required modules
async function fileWithModules(directoryPath) {
  const contentFromFile = {};
  try {
    const filesToSearch = await locateDirectoryFiles(directoryPath);

    filesToSearch.forEach(file => {
      return fs.readFileSync(file, function(error, content) {
        content = content.toString("utf-8");
        if (error) {
          console.error(error);
        } else {
          contentFromFile[file] = content;
          console.log(contentFromFile);
        }
      });
    });
  } catch (error) {
    console.error(error);
  }
}

const callbackFunc = (error, content) => {
  if (error) {
    console.error(error);
  } else {
    console.log("content", content);
  }
};

console.log(fileWithModules("/Users/taylorthompson/vim-city", callbackFunc));
