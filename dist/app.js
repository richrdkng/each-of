var cwd            = require('process').cwd(),
    Module         = require('module').Module,
    nodePath       = require('path'),
    appModulePaths = [];

/*
Module._nodeModulePaths = function(from) {
    var paths = old_nodeModulePaths.call(this, from);

    if (from.indexOf('node_modules') === -1) {
        paths = appModulePaths.concat(paths);
    }

    return paths;
};
*/

function addPath(path) {
    var parent;
    path = nodePath.normalize(path);

    if (appModulePaths.indexOf(path) === -1) {
        appModulePaths.push(path);
        // Enable the search path for the current top-level module
        require.main.paths.unshift(path);
        parent = module.parent;

        // Also modify the paths of the module that was used to load the app-module-paths module
        if (parent && parent !== require.main) {
            parent.paths.unshift(path);
        }
    }
}

addPath(cwd);

//addPath(__dirname);

var project = require('project');
console.log('project.name:', project.name);

/*
console.log(
    require('process').env.NODE_ENV
);
*/

/*
var spawn = require('child_process').spawn;

var args = [];

var opt = {
  cwd: __dirname,
  env: (function() {
    process.env.NODE_PATH = '.'; // Enables require() calls relative to the cwd :)
    return process.env;
  }()),
  stdio: [process.stdin, process.stdout, process.stderr]
};

var app = spawn(process.execPath, args, opt);
*/

