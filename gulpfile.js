'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyjs = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
//const livereload = require('gulp-livereload');
//const watchSass = require("gulp-watch-sass");
const connect = require('gulp-connect');

sass.compiler = require('node-sass');

gulp.task('connect', function(){
    connect.server({
        root: 'public',
        livereload: true
    });
});

// keeps gulp from crashing for scss errors
gulp.task('sass', function () {
    return gulp.src('./src/*.scss')
        .pipe(sass({ errLogToConsole: true }))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./css'));
});


gulp.task('livereload', function (){
    gulp.src('./css/**/*')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch('./src/*.scss', gulp.series('sass'));
    //gulp.watch('./css/**/*', ['livereload']);
});