/**
 * Created by khk on 2016-05-27.
 */
var gulp = require('gulp');
var react = require('gulp-react');
var nodemon = require('gulp-nodemon');
/*
gulp.task('default', function() {
    return gulp.src('src/javascripts/component/!*.js')
                .pipe(react())
                .pipe(gulp.dest('public/javascripts/component'));
});
*/
gulp.task('reactCompile', () => {
    return gulp.src('src/javascripts/component/*.js')
        .pipe(react())
        .pipe(gulp.dest('public/javascripts/component'))
})

gulp.task('runner', () => {
    var stream = nodemon({
        watch: 'src'
        , tasks: ['reactCompile']
    })
    return stream
})

gulp.task('default', ['reactCompile', 'runner']);