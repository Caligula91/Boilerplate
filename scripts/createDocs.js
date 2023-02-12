const { exec } = require('child_process');
const path = require('path');
const util = require('util');
const os = require('os');

const execute = util.promisify(exec);

const homeDir = os.homedir();
const docsLocation = `${homeDir}/doc`;
const removePreviousDocs = `rm -rf ${docsLocation}`;
const components = path.join(__dirname, '../components');
const apiDocPath = path.join(__dirname, '../node_modules/apidoc/bin/apidoc');
const generateDocs = `${apiDocPath} -i ${components} -o ${docsLocation}`;

(async function () {
  await execute(removePreviousDocs);
  await execute(generateDocs);
  console.log(`Apidoc generated at ${docsLocation}`);
}()).catch((err) => {
  console.log(err);
  process.exit(1);
});
