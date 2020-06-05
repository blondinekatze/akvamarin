var gulp = require('gulp');
var path = require('path');
var filter = require('gulp-filter');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var watch = require('gulp-watch');

gulp.task('symbols:build', function () {
    return gulp.src('./src/assets/symbols/icons/*.svg')
        .pipe(plumber())
        .pipe(filter(function (file) {
            return file.stat && file.stat.size;
        }))
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }, {
                    removeAttrs: {attrs: 'fill'}
                }]
            };
        }))
        .pipe(svgstore())
        .pipe(rename({suffix: '-symbols'}))
        .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('symbols:watch', function () {
    return watch('./src/assets/symbols/icons/*.svg', function () {
        return gulp.start('symbols:build');
    });
});