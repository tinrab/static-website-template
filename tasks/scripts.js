const path = './.tmp/scripts/index.js';
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const devConfig = {
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }]
    }]
  }
};

const dev = (gulp, $, browserSync) => () =>
  gulp.src(path)
  .pipe(webpackStream(devConfig), webpack)
  .pipe(gulp.dest('./dist'))
  .pipe(browserSync.stream());

const prod = (gulp, $) => () =>
  gulp.src(path)
  .pipe($.webpack(devConfig))
  .pipe($.uglify())
  .pipe($.size({
    title: 'scripts'
  }))
  .pipe(gulp.dest('./dist'));

module.exports = {
  dev,
  prod
};