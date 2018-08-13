var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    nib = require('nib'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    svgo = require('gulp-svgo'),
    size = require('gulp-size'),
    flatten = require('gulp-flatten');

gulp.task('pug', function () {
    return gulp.src('./blocks/index.pug')
        .pipe(plumber())
        .pipe(pug({
            pretty: true,
            basedir: 'blocks'
        }))
        .pipe(gulp.dest('page'))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src('./blocks/**/*.{png,jpg,gif}')
        .pipe(plumber())
        .pipe(imagemin([
          imagemin.optipng({
                optimizationLevel: 3
            }),
          imagemin.jpegtran({
                progressive: true
            })
  ]))
        .pipe(flatten())
        .pipe(gulp.dest('page/img'));
});

gulp.task('svg', function () {
    return gulp.src('./blocks/**/*.svg')
        .pipe(plumber())
        .pipe(svgo())
        .pipe(flatten())
        .pipe(gulp.dest('page/img'));
});

gulp.task('stylus', function () {
    return gulp.src('./blocks/**/*.styl')

        .pipe(plumber())
        .pipe(stylus({
            use: nib(),
            compress: false,
        }))
        .pipe(autoprefixer({
            browsers: ['last 15 versions'],
        }))
        .pipe(concat('main.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('page/css'))
});

gulp.task('scripts', function () {
    var js = gulp.src('./blocks/**/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(size({
            title: 'size of custom js'
        }))
        .pipe(gulp.dest('page/js'));
});

gulp.task('watch', function () {
    gulp.watch('./blocks/**/*.js', ['scripts']);
    gulp.watch('./blocks/**/*.pug', ['pug']);
    gulp.watch('./blocks/**/*.{png,jpg,gif}', ['images']);
    gulp.watch('./blocks/**/*.svg', ['svg']);
    gulp.watch('./blocks/**/*.styl', ['stylus']);
});

gulp.task('clean', function () {
    return gulp.src('page', {
            read: false
        })
        .pipe(clean());
});

gulp.task('default', ['clean'], function () {
    gulp.start(['stylus', 'scripts', 'images', 'svg', 'pug']);
});
