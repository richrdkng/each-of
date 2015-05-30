'use strict';

    // Project details
var name        = 'eachof',
    description = 'A function to iterate through arraylikes and objects and check if contains the given parameter',
    version     = '1.0.0',
    homepage    = 'http://richrdkng.github.io/eachof/',
    repository = {
        credentials: null,
        git: 'https://github.com/richrdkng/eachof.git'
    },
    issues = '',

    authors = [
        ['Richard King', 'richrdkng@gmail.com', 'https://github.com/richrdkng']
    ],
    license = [
        'MIT'
    ],
    keywords = [],
    dependencies = {
        dependencies: {},
        peerDependencies: {},
        devDependencies: {}
    },

    // Paths
    p = require('path'),
    root = p.dirname(__dirname),
    path = {
        root:       root,
        master:     root,
        ghpages:    root,
        project:    p.normalize(root+'/project'),
        image:      p.normalize(root+'/image'),
        markup:     p.normalize(root+'/markup'),
        script:     p.normalize(root+'/script'),
        style:      p.normalize(root+'/style')
    },

    log = console.log;


module.exports = {
    name:           name,
    description:    description,
    version:        version,
    path:           path,
    repository:     repository
};
