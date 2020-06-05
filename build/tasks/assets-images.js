var gulp = require('gulp');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');

var helpers = require('../helpers');

gulp.task('assets-images:build', function() {
    return gulp.src('./src/assets/images/**/*')
        .pipe(gulpif(helpers.isProd(), imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('assets-images:watch', function() {
    return watch('./src/assets/images/**/*', function() {
        return gulp.start('assets-images:build');
    });
});