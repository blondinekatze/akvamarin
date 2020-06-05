var gulp = require('gulp');
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var plumber = require('gulp-plumber');
var prettify = require('gulp-jsbeautifier');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');

var helpers = require('../helpers');

for (var name in helpers.handlebars) {
    if (!helpers.handlebars.hasOwnProperty(name)) {
        continue;
    }

    handlebars.Handlebars.registerHelper(name, helpers.handlebars[name]);
}

gulp.task('pages:build', function() {
    var data = {};
    var files = glob.sync('./src/data/**/*.json');
    files.forEach(function(file) {
        var dirname = path.basename(path.dirname(file)),
            basename = path.basename(file, '.json');

        if (typeof data[dirname] === 'undefined') {
            data[dirname] = {};
        }
        data[dirname][basename] = JSON.parse(fs.readFileSync(file));
    });

    return gulp.src('./src/pages/**/*.hbs')
        .pipe(plumber())
        .pipe(handlebars(data, {
            ignorePartials: true,
            batch: [
                './src/partials',
                './src/blocks'
            ]
        }))
        .pipe(rename(function(path) {
            if (path.dirname !== '.') {
                path.basename = path.dirname + '--' + path.basename;
                path.dirname = '.';
            }
            path.extname = '.html';
            return path;
        }))
        .pipe(gulpif(helpers.isProd(), prettify()))
        .pipe(gulp.dest('./dist'))
        .pipe(gulpif(helpers.isDev(), browserSync.reload({stream: true})));
});

gulp.task('pages:watch', function() {
    return watch([
        './src/pages/**/*.hbs',
        './src/partials/**/*.hbs',
        './src/blocks/**/*.hbs',
        './src/data/**/*.json'
    ], function() {
        return gulp.start('pages:build');
    });
});
