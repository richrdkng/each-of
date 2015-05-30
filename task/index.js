'use strict';

    // Project related
var project = require('../project'),

    // Gulp related
    gulp  = require('gulp'),
    debug = require('gulp-debug'),
    mocha = require('gulp-mocha'),

    log   = console.log;

gulp.task('default', function() {
    return gulp.src('../test/**/*.test.js', {read: false})
               .pipe(debug())
               .pipe(mocha());
});
