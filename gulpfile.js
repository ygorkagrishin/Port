var gulp    = require('gulp'),
    pug     = require('gulp-pug'),
    styl    =  require('gulp-stylus'),
    maps    =  require('gulp-sourcemaps'),
    pref    =  require('gulp-autoprefixer'),
    babel   = require('gulp-babel'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat'),
    rename  = require('gulp-rename'),
    del     = require('del');

var path = {
    pug: {
        src: 'src/pug/pages/*.pug',
        dest: 'assets/',
        watch: 'src/pug/**/*.pug'
    },
    styles: {
        src: 'src/static/styles/*.styl',
        dest: 'assets/',
        watch: 'src/static/styles/**/**/**/*.styl'
    },
    scripts: {
        src: 'src/static/scripts/*.js',
        dest: 'assets/',
        watch: 'src/static/scripts/*.js'
    },
    fonts: {
        src: 'src/static/fonts/**/*',
        dest: 'assets',
        watch: 'src/static/fonts/**/*'
    },
    images: {
        src: 'src/static/images/**/**/**/*',
        dest: 'assets/images/',
        watch: 'src/static/images/**/**/**/*'
    },
    php: {
        src: 'src/static/action.php',
        dest: 'assets/',
        watch: 'src/static/action.php'
    },
    libs: {
        jQuery: 'node_modules/jquery/dist/jquery.min.js',
        dest: 'assets/'
    }
}

gulp.task('clean', () => {
    return  del(['assets/*']);
});

gulp.task('pug', () => {
    return  gulp.src(path.pug.src)
                .pipe(pug())
                .pipe(gulp.dest(path.pug.dest));
});

gulp.task('styles', () => {
    return  gulp.src(path.styles.src)
                .pipe(maps.init())
                .pipe(styl({
                    compress: true,
                    'include css': true
                }))
                .pipe(pref())
                .pipe(maps.write())
                .pipe(rename({
                    suffix: ".min"
                }))
                .pipe(gulp.dest(path.styles.dest));
});

gulp.task('script', () => {
    return  gulp.src(path.scripts.src)
                .pipe(maps.init())
                .pipe(babel({
                    presets: ['env']
                }))
                .pipe(concat('script.min.js'))
                .pipe(uglify())
                .pipe(maps.write())
                .pipe(gulp.dest(path.scripts.dest));
});

gulp.task('fonts', () => {
    return  gulp.src(path.fonts.src)
                .pipe(gulp.dest(path.fonts.dest));
});

gulp.task('images', () => {
    return  gulp.src(path.images.src)
                .pipe(gulp.dest(path.images.dest));
});

gulp.task('php', () => {
    return  gulp.src(path.php.src)
                .pipe(gulp.dest(path.php.dest));
});

gulp.task('libs', () => {
    return  gulp.src(path.libs.jQuery)
                .pipe(concat('libs.min.js'))
                .pipe(gulp.dest(path.libs.dest));
})

gulp.task('watch', () => {
    gulp.watch(path.pug.watch, 
        gulp.series('pug'));
    gulp.watch(path.styles.watch, 
        gulp.series('styles'));
    gulp.watch(path.scripts.watch, 
        gulp.series('script'));
    gulp.watch(path.fonts.watch, 
        gulp.series('fonts'));
    gulp.watch(path.images.watch, 
        gulp.series('images'));
    gulp.watch(path.php.watch, 
        gulp.series('php'));
});

const build = gulp.series('clean', gulp.parallel('pug', 'styles', 'script', 'fonts', 'images', 'php', 'libs', 'watch'));

gulp.task('default', build);