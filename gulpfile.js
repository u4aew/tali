var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    jsmin = require('gulp-jsmin'),
    rename = require('gulp-rename'),
    cssmin = require('gulp-cssmin');
gulp.task('default', ['connect', 'watch']);

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});
gulp.task('watch', function () {
    gulp.watch(['index.html'], ['html']);
    gulp.watch(['src/style/sass/*.scss'], ['sass']);
    gulp.watch(['src/style/css/*.css'], ['production-css']);
    gulp.watch(['src/js/*.js'], ['production-js']);

});
gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(connect.reload());
});
gulp.task('sass', function () {
    return gulp.src('src/style/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/style/css/'))
        .pipe(connect.reload());
});

gulp.task('production-js', function () {
    return gulp.src(['src/js/jquery.js', 'src/js/jquery.popup.min.js', 'src/js/jquery.fancybox.js', 'src/js/script.js'])
        .pipe(concat('all.js'))
        .pipe(jsmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/js/'));
});
gulp.task('production-css', function () {
    gulp.src(['src/style/css/normalize.css', 'src/style/css/bootstrap.css', 'src/style/css/bootstrap-normalize.css', 'src/style/css/jquery.fancybox.css', 'src/style/css/popup.css', 'src/style/css/style.css'])
        .pipe(concat('style.css'))
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('build/style/'));
});