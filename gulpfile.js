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

gulp.task('tag', function (done) {
    var cp = require('child_process');
    var version = packageInfo.version;
    cp.exec('git tag ' + version + ' | git push origin ' + version + ':' + version + ' | git push origin master:master', done);
});

var wrapper = require('gulp-wrapper');
var date = new Date();
var header = ['/*',
        'Copyright ' + date.getFullYear() + ', ' + packageInfo.name + '@' + packageInfo.version,
        packageInfo.license + ' Licensed',
        'build time: ' + (date.toGMTString()),
    '*/', ''].join('\n');
    
gulp.task('build', function () {
    var less = require('gulp-less');
    return gulp.src(['lib/**/*.less','!lib/include/**/*']).pipe(less({
            paths: [path.join(__dirname, 'lib/')]
        }))
        .pipe(rename(function(path){
            path.basename += "-debug";
        }))
        .pipe(wrapper({
                    header: header
                }))
        .pipe(gulp.dest('build/css'))
        .pipe(rename(function(path){
            path.basename = path.basename.replace('-debug','');
        }))
        .pipe(minifyCSS({keepBreaks: true}))
        .pipe(gulp.dest('build/css'));
});

gulp.task('default', ['build']);