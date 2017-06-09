const config = require('./config')
const scanFiles = require('./lib/scanFiles');
const parse = require('./lib/parse');
const resultFormat = require('./lib/resultFormat');

scanFiles(config.projectPath, config.ignore).then(files => {
  return Promise.all(files.map(file => {
    return parse(file, config.scope, config.babel);
  }))
}).then(res => {
  resultFormat(res, config.projectPath);
}).catch(err => {
  console.error(err)
})
