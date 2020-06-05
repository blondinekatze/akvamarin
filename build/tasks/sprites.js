var gulp = require('gulp');
var svgSprite = require('gulp-svg-sprite');
var spritesmith = require('gulp.spritesmith');
var watch = require('gulp-watch');

gulp.task('svg-sprites:build', function() {
    return gulp.src('./src/assets/sprites/icons/*.svg')
        .pipe(svgSprite({
            shape: {
                spacing: {
                    padding: 2
                }
            },
            mode: {
                css: {
                    dest: '.',
                    layout: 'horizontal',
                    sprite: 'assets/images/icons-sprite.svg',
                    bust: false,
                    render: {
                        scss: {
                            dest: 'assets/scss/sprites/_svg-icons.scss',
                            template: './src/assets/sprites/svg-template.hbs'
                        }
                    },
                    common: 'icons'
                }
            }
        }))
        .pipe(gulp.dest('./src'));
});

gulp.task('svg-sprites:watch', function() {
    return watch('./src/assets/sprites/icons/*.svg', function() {
        return gulp.start('svg-sprites:build');
    });
});

gulp.task('png-sprites:build', function() {
    var spriteData = gulp.src('./src/assets/sprites/icons/*.{jpg,jpeg,png}')
        .pipe(spritesmith({
            imgName: 'icons-sprite.png',
            cssName: '_png-icons.scss',
            imgPath: '../images/icons-sprite.png',
            cssTemplate: './src/assets/sprites/png-template.hbs',
            padding: 2,
            cssSpritesheetName: 'icons'
        }));
    spriteData.img.pipe(gulp.dest('./src/assets/images'));
    spriteData.css.pipe(gulp.dest('./src/assets/scss/sprites'));
    return spriteData;
});

gulp.task('png-sprites:watch', function() {
    return watch('./src/assets/sprites/icons/*.{jpg,jpeg,png}', function() {
        return gulp.start('png-sprites:build');
    });
});