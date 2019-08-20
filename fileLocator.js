const fs = require("fs");

const locateDirectoryFiles = directoryPath => {
  const filesInDirectory = fs.readdirSync(directoryPath, function(
    error,
    files
  ) {
    if (error) {
      console.log("Error locating files in directory: ", error);
    } else {
      console.log("These are the files in the project directory", files);
    }
  });
  return filesInDirectory;
};

locateDirectoryFiles("/Users/taylorthompson/vim-city");
