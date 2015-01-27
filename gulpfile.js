var gulp = require('gulp'),
  gulpConfig = require('./gulp.config'),
  concat = require('gulp-concat'),
  wrap = require('gulp-wrap'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename')
  bump = require('gulp-bump');

gulp.task('default', ['build']);

gulp.task('build', function() {
  return gulp.src(gulpConfig.srcFiles)
    .pipe(concat('canvasImageSaver.js'))
    .pipe(wrap("(function(window){\n'use strict';\n\n<%= contents %>\n})(window);"))
    .pipe(gulp.dest(gulpConfig.dist))
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest(gulpConfig.dist));
});

gulp.task('watch', ['build'], function() {
  gulp.watch([gulpConfig.srcFiles, gulpConfig.testFiles], ['build']);
});

gulp.task('bump', function () {
  var type = gulp.env.major && 'major' ||
    gulp.env.minor && 'minor' ||
    gulp.env.patch && 'patch' ||
    gulp.env.prerelease && 'prerelease';
  gulp.src(['./bower.json', './package.json'])
    .pipe(bump({type: type || 'patch'}))
    .pipe(gulp.dest('./'));
});
