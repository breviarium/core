'use strict';

const gulp = require('gulp'),
    babel = require('gulp-babel');

gulp.task('compile', () => {
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

gulp.task('default', [ 'compile' ]);
