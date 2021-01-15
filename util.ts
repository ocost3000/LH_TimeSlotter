const fs = require("fs");

// copy
try {
  console.log("Moving to appsscript folder");
  fs.copyFileSync("./src/dist/index.html", "./appsscript/index.html");
  console.log("File moved");
}
catch (err) {
  console.log("Error moving index.html to appsscript folder");
}