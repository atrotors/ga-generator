'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var cleancss = require('gulp-clean-css');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var del = require('del');

gulp.task('clean', function() {
  return del(['js/*', 'css/*']);
});

gulp.task('uglify-js', function() {
  return gulp.src(['assets/js/*.js'])
    .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('js'));
});

gulp.task('minify-css', function() {
  var cssstream = gulp.src(['bower_components/normalize-css/normalize.css', 'assets/css/*.css']);
  var sassstream = gulp.src('assets/sass/*.scss')
   .pipe(sass().on('error', sass.logError));

  return merge(cssstream, sassstream)
    .pipe(sourcemaps.init())
      .pipe(cleancss())
      .pipe(concat('all.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch(['assets/js/*.js'], ['uglify-js']);
  gulp.watch(['assets/css/*.css', 'assets/sass/*.scss'], ['minify-css']);
});

gulp.task('default', ['clean', 'uglify-js', 'minify-css']);
