const fs = require('fs');
const path = require('path');
const glob = require('glob');

module.exports = function (cwd, ignore) {
  return new Promise((resolve, reject) => {
    glob('**/*.{js,jsx}', {
      cwd: cwd,
      ignore,
    }, (err, files) => {
      const absolutePath = files.map(file => path.resolve(cwd, file));
      err ? reject(err) : resolve(absolutePath)
    });
  })
}
