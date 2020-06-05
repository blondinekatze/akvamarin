var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');

var helpers = require('../helpers');

gulp.task('content-images:build', function() {
    return gulp.src('./src/images/**/*')
        .pipe(gulpif(helpers.isProd(), imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./dist/images'));
});

gulp.task('content-images:watch', function() {
    return watch('./src/images/**/*', function() {
        return gulp.start('content-images:build');
    });
});