var cwd = require('process').cwd();
    path = require('path');

console.log(path.normalize(cwd));

require.main.paths.push(path.normalize(cwd));
console.log(require.main.paths);
