#!/usr/bin/env node
'use strict';

var Module = require('module').Module;
var nodePath = require('path');

var appModulePaths = [];
var old_nodeModulePaths = Module._nodeModulePaths;

Module._nodeModulePaths = function(from) {
    var paths = old_nodeModulePaths.call(this, from);

    // Only include the app module path for top-level modules
    // that were not installed:
    if (from.indexOf('node_modules') === -1) {
        paths = appModulePaths.concat(paths);
    }

    return paths;
};

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

var cwd = __dirname;

console.log(cwd);
console.log(require('process').cwd());

addPath(__dirname);

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

