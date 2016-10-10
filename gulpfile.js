var gulp = require('gulp'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass');

gulp.task('default', ['connect', 'watch']);

gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});
gulp.task('watch', function () {
    gulp.watch(['index.html'], ['html']);
    gulp.watch(['src/style/sass/*.scss'], ['sass']);

});
gulp.task('html', function () {
    gulp.src('index.html')
        .pipe(connect.reload());
});
gulp.task('sass', function () {
    return gulp.src('src/style/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/style/'))
        .pipe(connect.reload());
});
 