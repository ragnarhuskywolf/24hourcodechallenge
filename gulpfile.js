var gulp = require('gulp');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
var errorNotifier = require('gulp-error-notifier');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();

// Logs Message
gulp.task('message', function(){
    return console.log('Gulp is running...');
});

// Optimize Images
// gulp.task('imageMin', function (){
//     gulp.src('src/images/*')
//         .pipe(imagemin())
//         .pipe(gulp.dest('dist/images'))
// });

// Minify JS
gulp.task('minify', function(){
    gulp.src('js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile Sass into CSS
// gulp.task('sass', function(){
//     gulp.src('sass/*.scss')
//         .pipe(errorNotifier.handleError(sass({outputStyle: 'compressed'})).on('error', sass.logError))
//         .pipe(gulp.dest('dist/css'));
// });

// Scripts Concatenation
gulp.task('scripts', function(){
    gulp.src('js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("sass/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("sass/*.scss")
        .pipe(sass())
        .pipe(errorNotifier.handleError(sass({outputStyle: 'compressed'})).on('error', sass.logError))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['message', 'sass', 'scripts','serve']);

gulp.task('watch', function(){
    gulp.watch('js/*.js', ['scripts']);
    // gulp.watch('src/images/*', ['imageMin']);
    gulp.watch('sass/*.scss', ['sass']);
});