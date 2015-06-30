'use strict';

var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
  useref = require('gulp-useref'),
     del = require('del');

var options = {
  src: 'src',
  dist: 'dist'
};

gulp.task('compileSass', function() {
  return gulp.src(options.src + "/scss/application.scss")
      .pipe(maps.init())
      .pipe(sass())
      .pipe(maps.write('./'))
      .pipe(gulp.dest(options.src + '/css'));
});

gulp.task('watchFiles', function() {
  gulp.watch(options.src + '/scss/**/*.scss', ['compileSass']);
})

gulp.task('clean', function() {
  del(['dist', options.src + '/css/application.css*']);
});


gulp.task('html', ['compileSass'], function() {
  var assets = useref.assets();
  gulp.src(options.src + '/index.html')
      .pipe(assets)
      .pipe(uglify())
      .pipe(assets.restore())
      .pipe(useref())
      .pipe(gulp.dest(options.dist));
});

gulp.task("build", function() {
  return gulp.src([options.src + "/img/**", options.src + "/fonts/**"], { base: options.src})
            .pipe(gulp.dest(options.dist));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});

