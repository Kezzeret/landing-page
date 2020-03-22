const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

const browserSync = require('browser-sync').create();

function style() {
    return gulp.src('./SCSS/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
}

function babelfy() {
    return gulp.src('./JS/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./JS-babel/'))
        .pipe(browserSync.stream());
}

function watch () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./SCSS/**/*.scss', style);
    gulp.watch('./JS/*.js', babelfy);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;