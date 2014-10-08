/**
 *  a build template for mx modules
 *  @author yiminghe@gmail.com
 */
var gulp = require('gulp');
var path = require('path');
var rename = require('gulp-rename');
var packageInfo = require('./package.json');
var cwd = process.cwd();
var minifyCSS = require('gulp-minify-css');

gulp.task('build', function () {
    var less = require('gulp-less');
    return gulp.src(['lib/**/*.less','!lib/include/**/*']).pipe(less({
            paths: [path.join(__dirname, 'lib/')]
        }))
        .pipe(rename(function(path){
            path.basename += "-debug";
        }))
        .pipe(gulp.dest('build/'))
        .pipe(rename(function(path){
            path.basename = path.basename.replace('-debug','');
        }))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('build'));
});

gulp.task('default', ['build']);