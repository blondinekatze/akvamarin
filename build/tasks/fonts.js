var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task('fonts:build', function() {
    return gulp.src('./src/assets/fonts/**/*')
        .pipe(gulp.dest('./dist/assets/fonts'));
});

gulp.task('fonts:watch', function() {
    return watch('./src/assets/fonts/**/*', function() {
        return gulp.start('fonts:build');
    });
});
