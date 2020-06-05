var gulp = require('gulp');
var gulpif = require('gulp-if');
var include = require('gulp-include');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

var merge = require('merge-stream');
var log = require('fancy-log');
var chalk = require('chalk');
var prettyHrtime = require('pretty-hrtime');

var config = require('../config');
var helpers = require('../helpers');

var build = function(entry) {
    var start;
    return gulp.src(entry.scripts.src)
        .on('end', function() {
            start = process.hrtime();
            log(chalk.blue(entry.name) + ' scripts building...');
        })
        .pipe(plumber())
        .pipe(include({
            extensions: 'js',
            hardFail: true,
            includePaths: [
                './bower_components',
                './node_modules',
                './src/assets/js'
            ]
        }))
        .pipe(gulpif(helpers.isProd(), uglify()))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(gulpif(helpers.isDev(), browserSync.reload({stream: true})))
        .on('end', function() {
            log(chalk.blue(entry.name) + ' scripts built after ' + chalk.green(prettyHrtime(process.hrtime(start))));
        });
};

gulp.task('scripts:build', function() {
    var stream = merge();
    config.entries.forEach(function(entry) {
        stream.add(build(entry));
    });
    return stream;
});

gulp.task('scripts:watch', function() {
    var timeouts = [];
    config.entries.forEach(function(entry, index) {
        watch(entry.scripts.watch, function() {
            // prevent loop running
            if (typeof timeouts[index] !== 'undefined') {
                clearTimeout(timeouts[index]);
            }
            timeouts[index] = setTimeout(function() {
                build(entry);
            }, 10);
        });
    });
});
