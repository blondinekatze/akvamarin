var gulp = require('gulp');
var gulpif = require('gulp-if');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var include = require('gulp-include');
var postcss = require('gulp-postcss');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');

var merge = require('merge-stream');
var log = require('fancy-log');
var chalk = require('chalk');
var prettyHrtime = require('pretty-hrtime');

var config = require('../config');
var helpers = require('../helpers');

const mediaQueriesSplitter = require('gulp-media-queries-splitter');
var gcmq = require('gulp-group-css-media-queries');


var build = function(entry) {
    var start;
    var processors = [
        require('autoprefixer')()
    ];
    if (helpers.isProd()) {
        processors.push(require('cssnano')({autoprefixer: false}));
    }
    return gulp.src(entry.styles.src)
        .on('end', function() {
            start = process.hrtime();
            log(chalk.blue(entry.name) + ' styles building...');
        })
        .pipe(plumber())
        .pipe(include({
            extensions: ['css', 'scss'],
            hardFail: true,
            includePaths: [
                './bower_components',
                './node_modules',
                './src/assets/scss'
            ]
        }))
        .pipe(sassGlob())
        .pipe(sass({
            includePaths: [
                './bower_components',
                './node_modules',
                './src/assets/scss'
            ]
        }).on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(gulpif(entry.name === 'main', mediaQueriesSplitter([
            {media: 'none', filename: 'main.css'},
            {media: {max: '99999px'}, filename: 'media.css'},
        ])))
        .pipe(gulpif(entry.name === 'main', gcmq()))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(gulpif(helpers.isDev(), browserSync.stream()))
        .on('end', function() {
            log(chalk.blue(entry.name) + ' styles built after ' + chalk.green(prettyHrtime(process.hrtime(start))));
        });
};


gulp.task('styles:build', function() {
    var stream = merge();
    config.entries.forEach(function(entry) {
        if (typeof entry.styles === 'object') {
            stream.add(build(entry));
        }
    });
    return stream;
});

gulp.task('styles:watch', function() {
    var timeouts = [];
    config.entries.forEach(function(entry, index) {
        if (typeof entry.styles === 'object') {
            watch(entry.styles.watch, function () {
                // prevent loop running
                if (typeof timeouts[index] !== 'undefined') {
                    clearTimeout(timeouts[index]);
                }
                timeouts[index] = setTimeout(function () {
                    build(entry);
                }, 10);
            });
        }
    });
});