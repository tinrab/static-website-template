const path = './.tmp/images/**/*';

const dev = (gulp, $) => () =>
  gulp.src(path)
  .pipe(gulp.dest('./dist/images'));

const prod = (gulp, $) => () =>
  gulp.src(path)
  .pipe($.cache($.imagemin({
    progressive: true,
    interlaced: true
  })))
  .pipe($.size({
    title: 'images'
  }))
  .pipe(gulp.dest('./dist/images'));

module.exports = {
  dev,
  prod
};
