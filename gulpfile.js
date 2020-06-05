'use strict';

var gulp = require('gulp');
var requireDir = require('require-dir');
var runSequence = require('run-sequence').use(gulp);
var del = require('del');

var config = require('./build/config');

gulp.task('dev', function() {
    return runSequence(
        'build',
        'webserver',
        'watch'
    );
});

gulp.task('prod', function() {
    config.env = 'production';
    return runSequence(
        'clean',
        'build'
    );
});

gulp.task('build', function() {
    return runSequence(
        [
            'svg-sprites:build',
            'png-sprites:build',
            'symbols:build'
        ],
        'assets-images:build',
        [
            'scripts:build',
            'styles:build',
            'content-images:build',
            'fonts:build'
        ],
        'pages:build'
    );
});

gulp.task('watch', [
    'scripts:watch',
    'styles:watch',
    'svg-sprites:watch',
    'png-sprites:watch',
    'symbols:watch',
    'assets-images:watch',
    'fonts:watch',
    'content-images:watch',
    'pages:watch'
]);

requireDir('./build/tasks', {recurse: true});

gulp.task('clean', function() {
    return del(['./dist/**/*']);
});