/**
 * Created by khk on 2016-05-27.
 */
var gulp = require('gulp');
var react = require('gulp-react');
var nodemon = require('gulp-nodemon');
var path = require('path');

gulp.task('reactCompile', () => {
    return gulp.src('src/javascripts/component/*.js')
        .pipe(react())
        .pipe(gulp.dest('public/javascripts/component'))
})

gulp.task('runner', () => {
    var stream = nodemon({
        script : "bin/www",
        ignore: [
            'public/',
            'node_modules/'
        ],
        tasks: function (files) {
            var tasks = [];
            files.forEach((file) => {
                if (path.basename(file) == "component.react.js") {
                    tasks.push('reactCompile');
                }
            })
            return tasks;
        }
    })
    return stream
})

gulp.task('default', ['reactCompile', 'runner']);