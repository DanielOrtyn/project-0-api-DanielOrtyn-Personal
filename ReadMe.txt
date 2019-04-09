node_modules               // libraries
src                        // source code
package.json               // used by npm to manage project dependencies(libraries)
tsconfig.json              // config for TS rules and how to compile it


////////////////////////////
npm install                // will install all dependencies in package.json
npm install -g <name>      // -g is for global, so global install








npm init
	// complete file
code .
npm install --save express
npm install --save --dev @types/express
npm install --save -dev nodemon				// restarts server whenever file changes are saved
npm install --save body-parser

// create files(index.js and tsconfig.json)
npm start
// go to http://localhost:8080/test
// assuming you set port to 8080k