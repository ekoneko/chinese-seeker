const _ = require('lodash');
const path = require('path');

function formatNodes(node) {
  const line = _.get(node, 'loc.start.line');
  const value = _.trim(node.value);
  console.log('  line: ', line, 'value: ', value)
}

module.exports = function (results, filePath) {
  results.forEach(result => {
    if (!result) return;
    const file = path.relative(filePath, result.file);
    console.log(file, ':');
    result.errors.forEach(node => formatNodes(node));
  })
}
