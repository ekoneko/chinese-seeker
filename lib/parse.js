const babel = require('babel-core');
const walk = require('babylon-walk');
const fs = require('fs');

function matchChinese(scope) {
  return function(node, errors) {
    if (node.value.match(scope)) {
      errors.push(node);
    }
  }
}

function parse (content, filePath, babelOptions) {
  try {
    return babel.transform(content, babelOptions)
  } catch (e) {
    throw new Error(`Parse error: in ${filePath}`, e)
  }
}

module.exports = function (filePath, scope, babelOptions) {
  const text = fs.readFileSync(filePath).toString();
  return new Promise((resolve, reject) => {
    const errors = [];
    const {ast} = parse(text, filePath, babelOptions);
    const visitBy = matchChinese(scope)
    const visitors = {
      StringLiteral: visitBy,
      JSXText: visitBy,
    }
    walk.recursive(ast, visitors, errors);

    if (errors.length) {
      resolve({
        errors,
        file: filePath
      });
    } else {
      resolve(null);
    }
  })
}
