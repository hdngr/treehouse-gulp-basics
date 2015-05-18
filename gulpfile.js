"use strict";

var gulp = require('gulp');

gulp.task("hello", function() {
    console.log("Hello!!")
});

gulp.task("default", ["hello"], function() {
    console.log("the default task!!!!");
});