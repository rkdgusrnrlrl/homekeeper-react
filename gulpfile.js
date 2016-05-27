/**
 * Created by khk on 2016-05-27.
 */
var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('default', function() {
    return gulp.src('src/javascripts/component/*.js')
                .pipe(react())
                .pipe(gulp.dest('public/javascripts/component'));
});