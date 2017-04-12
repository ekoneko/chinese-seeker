const babylon = require('babylon');
const walk = require('babylon-walk');
const fs = require('fs');

function matchChinese(scope) {
  return function(node, errors) {
    if (node.value.match(scope)) {
      errors.push(node);
    }
  }
}

function parse (content, filePath) {
  /**
   * I still got this problem: https://github.com/babel/babylon/issues/311
   * so, it's a hacker for remove all `...args` in code
   */
  const text = content.replace(/,\s*\.{3}[a-z0-9_]/i, '')

  try {
    return babylon.parse(text, {
      allowImportExportEverywhere: true,
      plugins: ['jsx', 'classProperties'],
    })
  } catch (e) {
    throw new Error(`Parse error: in ${filePath}`, e)
  }
}

module.exports = function (filePath, scope) {
  const text = fs.readFileSync(filePath).toString();
  return new Promise((resolve, reject) => {
    const errors = [];
    const ast = parse(text, filePath);
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
