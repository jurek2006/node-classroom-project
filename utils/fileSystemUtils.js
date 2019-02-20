const path = require('path');
const fs = require('fs');

const getFileAbsolutePath = (filename, pathRelativeToRoot = '') => {
    return path.join(
        path.dirname(process.mainModule.filename),
        pathRelativeToRoot,
        filename
    );
};

exports.readJsonFile = (filename, pathRelativeToRoot) => {
    // reads and parses JSON file
    const p = getFileAbsolutePath(filename, pathRelativeToRoot);

    return new Promise((resolve, reject) => {
        fs.readFile(p, (err, data) => {
            if (err) reject(err);
            try {
                resolve(JSON.parse(data));
            } catch (err) {
                reject(err);
            }
        });
    });
};
