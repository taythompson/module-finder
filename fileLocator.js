/* eslint-disable quotes */
const fs = require("fs");

// function will return the files found in directory based on project path

const locateDirectoryFiles = (directoryPath, callback) => {
  const filesInDirectory = fs.readdirSync(directoryPath, function(
    error,
    files
  ) {
    if (error) {
      console.log("Error locating files in directory: ", error);
    } else {
      console.log("These are the files in the project directory", files);
      callback(null, files);
    }
  });

  return filesInDirectory;
};

const callbackFunc = (error, content) => {
  if (error) {
    console.error(error);
  } else {
    console.log("content", content);
  }
};

locateDirectoryFiles("/Users/taylorthompson/vim-city", callbackFunc);

//function that will return the modules needed for project found in the package.json file

const requiredModules = (directoryPath, callback) => {
  const filesFound = locateDirectoryFiles(directoryPath);

  const packageJson = filesFound.filter(file => file === "package.json");

  const packageName = packageJson.join();

  const modules = fs.readFile(`${directoryPath}/${packageName}`, function(
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

requiredModules("/Users/taylorthompson/vim-city", callbackFunc);
