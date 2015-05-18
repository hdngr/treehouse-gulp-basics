"use strict";

var gulp = require('gulp'),
  concat = require('gulp-concat');

gulp.task("concatScripts", function() {
    gulp.src([
        'js/jquery.js',
        'js/sticky/jquery.sticky.js',
        'js/main.js'
        ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest('js'));
});

gulp.task("default", ["hello"], function() {
    console.log("the default task!!!!");
});