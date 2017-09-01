module.exports = (gulp, $) => () =>
  gulp.src(['./dist/**/*.css', './dist/**/*.js', './dist/**/*.html'])
  .pipe($.selectors.run())
  .pipe(gulp.dest('./dist'));
