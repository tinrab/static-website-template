const gulp = require('gulp');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();
const $ = require('gulp-load-plugins')();
$.del = require('del');

// Import tasks
for (const t of ['html', 'styles', 'scripts', 'images']) {
  gulp.task(t, require(`./tasks/${t}`).dev(gulp, $, browserSync));
  gulp.task(`${t}:prod`, require(`./tasks/${t}`).prod(gulp, $));
}
gulp.task('post', require('./tasks/post')(gulp, $));

// Clean
gulp.task('clean', () => $.del(['./dist/*', './.tmp']));

// Hugo site
gulp.task('hugo', $.shell.task('hugo --config=config.toml --destination=../.tmp', {
  cwd: 'src'
}));
gulp.task('hugo:prod', $.shell.task('hugo --config=config.prod.toml --destination=../.tmp', {
  cwd: 'src'
}));

// Development build
gulp.task('build', ['clean'], cb => runSequence(
  'hugo',
  'html',
  'styles',
  'scripts',
  'images',
  cb
));

// Production build
gulp.task('build:prod', cb => runSequence(
  'clean',
  'hugo:prod',
  'html:prod',
  'scripts:prod',
  'styles:prod',
  'images:prod',
  'post',
  cb
));

// Development server
gulp.task('serve', ['build'], () => {
  browserSync.init({
    notify: false,
    server: './dist',
    port: 3000
  });
  gulp.watch('src/static/styles/**/*.scss', () => runSequence('hugo', 'styles'));
  gulp.watch('src/static/scripts/**/*.js', () => runSequence('hugo', 'scripts'));
  gulp.watch([
    'src/layouts/**/*',
    'src/static/images/**/*',
    'src/content/**/*',
    'src/data/**/*'
  ], () => runSequence('build', browserSync.reload));
});
