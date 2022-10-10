const path = require('path');
const globalVariables = require(path.resolve('variables'));
const convertToPosixFriendlyPath = require('./convertToPosixFriendlyPath');
const objProp = require('./objProp');

module.exports = function getVariableByFilePath(file, varName) {
  const contextVariables = getContextVariables(file);

  let varValue = objProp(contextVariables, varName);
  if (varValue) {
    return varValue;
  }

  varValue = objProp(globalVariables, varName);
  if (varValue) {
    return varValue;
  }
};

function getContextVariables(file) {
  const posixFriendlyPath = convertToPosixFriendlyPath(file.path);
  const pathToVersionedDocsRoot = posixFriendlyPath.match(/calico.*_versioned_docs\/version-.*?\//g);

  if (pathToVersionedDocsRoot) {
    return require(path.resolve(`${pathToVersionedDocsRoot[0]}variables.js`));
  } else if (posixFriendlyPath.includes('/docs/calico/')) {
    return require(path.resolve('calico/variables.js'));
  } else if (posixFriendlyPath.includes('/docs/calico-cloud/')) {
    return require(path.resolve('calico-cloud/variables.js'));
  } else if (posixFriendlyPath.includes('/docs/calico-enterprise/')) {
    return require(path.resolve('calico-enterprise/variables.js'));
  }
}
