'use strict';

const gulp = require('gulp'),
    ava = require('gulp-ava'),
    babel = require('gulp-babel');

gulp.task('compile', [
    'compile-lib',
    'compile-test'
]);

gulp.task('compile-lib', () => {
    return gulp.src('lib/*.js')
            .pipe(babel({
                presets: [ 'es2015' ],
                plugins: [
                    'transform-runtime',
                    'syntax-async-functions',
                    'transform-async-to-generator'
                ]
            }))
            .pipe(gulp.dest('build/lib'));
});

gulp.task('compile-test', () => {
    return gulp.src('test/*.js')
            .pipe(babel({
                presets: [ 'es2015' ],
                plugins: [
                    'transform-runtime',
                    'syntax-async-functions',
                    'transform-async-to-generator'
                ]
            }))
            .pipe(gulp.dest('build/test'));
});

gulp.task('test', [ 'compile' ], () => {
    return gulp.src('build/test/*.js')
            .pipe(ava());
});

gulp.task('default', [ 'compile' ]);
