var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pug = require('gulp-pug'),
    nib = require('nib'),
    stylus = require('gulp-stylus'),
    imagemin = require('gulp-imagemin'),
    imageminJpegRecompress = require('imagemin-jpeg-recompress'),
    imageminPngquant = require('imagemin-pngquant'),
    svgo = require('gulp-svgo'),
    autoprefixer = require('gulp-autoprefixer'),
    plumber = require('gulp-plumber'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
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
    return gulp.src('./blocks/**/*.{png,jpg,gif,svg}')
        .pipe(plumber())
        .pipe(imagemin([
            imagemin.gifsicle({
                interlaced: true
            }),
            imageminJpegRecompress({
                progressive: true,
                max: 85,
                min: 75
            }),
          imageminPngquant({
                quality: '80'
            }),
          imagemin.svgo({
                plugins: [{
                    removeViewBox: true
                }]
            })
        ]))
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
    return gulp.src('./blocks/**/*.js')
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
    gulp.watch('./blocks/**/*.{png,jpg,gif,svg}', ['images']);
    gulp.watch('./blocks/**/*.styl', ['stylus']);
});

gulp.task('clean', function () {
    return gulp.src('page', {
            read: false
        })
        .pipe(clean());
});

gulp.task('default', ['clean'], function () {
    gulp.start(['stylus', 'scripts', 'images', 'pug']);
});
