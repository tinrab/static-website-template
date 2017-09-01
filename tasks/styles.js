const path = './.tmp/styles/**/*.scss';
const AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

const dev = (gulp, $, browserSync) => () =>
  gulp.src(path)
  .pipe($.sourcemaps.init())
  .pipe($.sass({
    precision: 10,
    includePaths: ['node_modules']
  }).on('error', $.sass.logError))
  .pipe($.sourcemaps.write('.'))
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream());

const prod = (gulp, $) => () =>
  gulp.src(path)
  .pipe($.sass({
    precision: 10,
    includePaths: ['node_modules']
  }))
  .pipe($.purifycss(['./.tmp/**/*.js', './.tmp/**/*.html']))
  .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
  .pipe($.cssnano())
  .pipe($.size({
    title: 'styles'
  }))
  .pipe(gulp.dest('./dist'));

module.exports = {
  dev,
  prod
};