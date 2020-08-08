const { src, dest, watch, parallel } = require('gulp');
const sass = require('gulp-sass');
const wait = require("gulp-wait");
const minifycss = require('gulp-minify-css');
const browserSync = require("browser-sync");
function scss() {
    src("./src/scss/main.scss")
        .pipe(wait(200))
        .pipe(sass().on('error', sass.logError))
        .pipe(minifycss({
            keepSpecialComments: false,
            removeEmpty: true
        }))
        .pipe(dest("./src/dist"))
}
function run() {
    browserSync.init({
        server: './src'
    })
    watch("./src/index.html").on("change", browserSync.reload)
    watch("./src/css/main.css").on("change", browserSync.reload)
    watch("./src/scss/**/*.scss").on("change", scss)
}

exports.default = parallel(scss, run);