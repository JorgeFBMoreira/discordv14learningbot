const { glob } = require("glob");
//const { promisify } = require("util");
//const proGlob = promisify(glob);

async function loadFiles(dirName) {
    const Files = await glob(`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`);
    
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
}

module.exports = { loadFiles };

/*

import * as path from 'path';
import glob from 'glob-promise';

// const dir = path.dirname(__dirname);
const txtURL = path.resolve('folder-area', '*.txt');
const testURL = './folder-area/*.txt';

const returnTxtFiles = async () => {
const txtFiles = await glob(testURL);
console.log(txtFiles);
};

returnTxtFiles();

*/