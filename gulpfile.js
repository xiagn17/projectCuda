const gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),         // concat css
    minifyCSS = require('gulp-minify-css'),         // min css
    rename = require("gulp-rename"),                // rename files
    autoprefixer = require('gulp-autoprefixer'),    // autoprefix css
    imagemin = require('gulp-imagemin'),            // image fix
    clean = require('gulp-clean'),                  // clean build
    concat = require('gulp-concat'),                // concat js
    minify = require('gulp-minify'),                // min js
    del = require('del'),                           // del files/folders
    runSequence = require('run-sequence');          // async tasks




gulp.task('default', function () {
    runSequence('clean', 'css', 'html', 'fonts', 'vendor', 'js', 'img-min');
});



gulp.task('clean', function () {
    return gulp.src('build', {read: false})
        .pipe(clean());
});
gulp.task('del-js', function () {
    return del(['build/js/*.js', '!build/js/*.min.js']);
});



gulp.task('css', function () {
    return gulp.src(['src/css/mixins.css', 'src/css/style.css', 'src/css/media.css'])
        .pipe(concatCss("style.css"))
        .pipe(autoprefixer({
            browsers: ['last 20 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(rename('style.css'))
        .pipe(gulp.dest('build/css/'));
});

gulp.task('html', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('build/'));
});
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**')
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('vendor', function () {
    return gulp.src('src/vendor/**/*')
        .pipe(gulp.dest('build/vendor'));
});




gulp.task('js-min', function () {
    return gulp.src('src/js/*.js')
        .pipe(concat('script.js'))
        .pipe(minify({
            ext: {
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('build/js/'))
});

gulp.task('js', function (cb) {
    runSequence('js-min', 'del-js', cb);
});





gulp.task('img-min', function () {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});



