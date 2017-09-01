const path = './.tmp/**/*.html';

const dev = (gulp, $) => () =>
  gulp.src(path)
  .pipe(gulp.dest('./dist'));

const prod = (gulp, $) => () =>
  gulp.src(path)
  .pipe($.htmlmin({
    removeComments: true,
    collapseWhitespace: true,
    collapseBooleanAttributes: true,
    removeAttributeQuotes: true,
    removeRedundantAttributes: true,
    removeEmptyAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    removeOptionalTags: true
  }))
  .pipe($.size({
    title: 'html',
    showFiles: true
  }))
  .pipe(gulp.dest('./dist'));

module.exports = {
  dev,
  prod
};
