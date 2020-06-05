var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('webserver', function() {
    browserSync.init({
        server: {
            baseDir: './dist'
        },
        host: 'localhost',
        port: 9228,
        logPrefix: 'gulp'
    });
});