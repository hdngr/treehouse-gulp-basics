'use strict';

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps');

gulp.task('concatScripts', function() {
  return gulp.src(['./js/jquery.js', './js/sticky/jquery.sticky.js', './js/main.js'])
   .pipe(maps.init())
    .pipe(concat('app.js'))
   .pipe(maps.write('./'))
    .pipe(gulp.dest('./js'));
});

gulp.task('uglifyScripts', function() {
  return gulp.src('./js/app.js')
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js'))
    .on('error', console.log);
});

gulp.task('compileSass', function() {
  return gulp.src("scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('css'));
});

gulp.task('watchFiles', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('js/main.js', ['concatScripts']);
})

gulp.task('clean', function() {
  del(['dist', 'css/application.css*', 'js/app*.js*']);
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});

