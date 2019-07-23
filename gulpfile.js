var gulp = require('gulp');
var base64 = require('gulp-base64');

gulp.task('build', function () {
    return gulp.src('./dist/*.css')
        .pipe(base64({
            extensions: ['svg', 'woff', 'woff2'],
            maxImageSize: 8*1024, // bytes,
            deleteAfterEncoding: true,
            debug: true
        }))
        .pipe(gulp.dest('./dist'));
});
