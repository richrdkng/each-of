'use strict';

    // Project details
var name    = 'eachof',
    version = '1.0.0',
    license = 'MIT',

    description  = 'jQuery\'s .hide() extension, that adds an additional option to remove the element after it is hidden.',
    homepage     = 'https://github.com/richrdkng/eachof',
    authors      = [
        ['Richard King', 'richrdkng@gmail.com', 'https://github.com/richrdkng']
    ],

    main    = 'index.js',
    scripts = {
        gulp:  'gulp --gulpfile task/index.js',
        build: 'npm install && grunt build',
        test:  'grunt --verbose'
    },

    repository = {
        credentials: null,
        git: 'https://github.com/richrdkng/eachof.git'
    },
    issues = 'https://github.com/richrdkng/eachof/issues',

    dependencies = {
    },
    devDependencies = {
    },

    keywords = [
        'jquery',
        'exists',
        'plugin',
        'jquery-plugin',
        'jquery-exists',
        'jquery.exists',
        'javascript',
        'js',
        'amd',
        'requirejs',
        'production',
        'tool'
    ],

    path = require('path'),
    root = path.dirname(__dirname);

    // include credentials, if present
    try {
        repository.credentials = require('./credentials');
    } catch(error) {
        repository.credentials = false;
    }

module.exports = {
    name:            name,
    version:         version,
    license:         license,

    description:     description,
    homepage:        homepage,
    authors:         authors,

    main:            main,
    scripts:         scripts,

    repository:      repository,
    issues:          issues,

    dependencies:    dependencies,
    devDependencies: devDependencies,
    keywords:        keywords,

    script:          path.normalize(root + '/src/eachof.js'),
    path:            {
        root:        root,
        master:      root,
        ghpages:     path.normalize(root + '/../gh-pages'),
        project:     path.normalize(root + '/project'),
        src:         path.normalize(root + '/src'),
        test:        path.normalize(root + '/test'),
        dist:        path.normalize(root + '/dist')
    }
};
