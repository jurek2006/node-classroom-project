const path = require('path');
const fs = require('fs');

exports.readJsonFile = (filename, pathRelativeToRoot) => {
    // reads and parses JSON file
    const fileAbsolutePath = path.resolve(pathRelativeToRoot, filename);

    return new Promise((resolve, reject) => {
        fs.readFile(fileAbsolutePath, (err, data) => {
            if (err) reject(err);
            try {
                resolve(JSON.parse(data));
            } catch (err) {
                reject(err);
            }
        });
    });
};
