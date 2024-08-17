// import fs from "fs";
// import path from "path";

// const directory = path.join(path.resolve(), "dist");

// function addJsExtension(dir) {
//   fs.readdirSync(dir).forEach((file) => {
//     const fullPath = path.join(dir, file);
//     const stat = fs.lstatSync(fullPath);

//     if (stat.isDirectory()) {
//       addJsExtension(fullPath);
//     } else if (file.endsWith(".js")) {
//       let content = fs.readFileSync(fullPath, "utf-8");

//       // Match import/export statements and add .js to the end if not present
//       content = content.replace(/(from\s+['"]\..+?)(['"])/g, "$1.js$2");
//       content = content.replace(/(import\s+['"]\..+?)(['"])/g, "$1.js$2");

//       fs.writeFileSync(fullPath, content, "utf-8");
//     }
//   });
// }

// addJsExtension(directory);

import fs from "fs";
import path from "path";

const directory = path.join(path.resolve(), "dist");

function addJsExtension(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.lstatSync(fullPath);

    if (stat.isDirectory()) {
      addJsExtension(fullPath);
    } else if (file.endsWith(".js")) {
      let content = fs.readFileSync(fullPath, "utf-8");

      // Match import/export statements and add .js to the end if not present
      content = content.replace(/(from\s+['"]\..+?)(['"])/g, "$1.js$2");
      content = content.replace(/(import\s+['"]\..+?)(['"])/g, "$1.js$2");

      fs.writeFileSync(fullPath, content, "utf-8");
    }
  });
}

addJsExtension(directory);
