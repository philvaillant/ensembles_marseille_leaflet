var gulp = require('gulp');

/* HTML */
var ejs = require('gulp-ejs');
const rename = require('gulp-rename');

var PAGES = ['index']
var OUTPUT_DIR = ['public']

gulp.task('compile-html', function () {
    var page_list = [];
    PAGES.forEach(function (page) {
        page_list.push('views/' + page + '.ejs');
    });
    return gulp.src(page_list)
        .pipe(ejs({}))
        .pipe(rename(function (path) {
            path.extname = '.html';
        }))
        .pipe(gulp.dest(OUTPUT_DIR));
});

/* CSS */
// var path = require('path');

// gulp.task('compile-css', function () {
//     var page_list = [];
//     PAGES.forEach(function (page) {
//         page_list.push('pages/styles/' + page + '.scss');
//     });
//     return gulp.src(page_list)
//         .pipe(sass())
//         .pipe(rename(function (path) {
//             path.extname = '.css';
//         }))
//         .pipe(gulp.dest(config.OUTPUT_DIR));
// });

// gulp.task('compile', gulp.series('clean', 'compile-html', 'compile-css'));

gulp.task('compile',gulp.series('compile-html'));