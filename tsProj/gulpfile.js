var gulp = require("gulp");
var browserify = require("browserify");// 把所有模块捆绑成一个JavaScript文件，支持CommonJS模块（也正是Typescript和Node支持的类型）
var source = require("vinyl-source-stream");// vinyl-source-stream会将Browserify的输出文件适配成gulp能够解析的格式，它叫做 vinyl。
var watchify = require("watchify"); // 启动Gulp并保持运行状态，当你保存文件时自动编译。 帮你进入到编辑-保存-刷新浏览器的循环中。 

var tsify = require("tsify");// tsify是Browserify的一个插件，就像gulp-typescript一样，它能够访问TypeScript编译器
var ts = require("gulp-typescript");// Typescript的一个gulp插件
var gutil = require("gulp-util"); // 
var tsProject = ts.createProject("tsconfig.json");
var paths = {
    pages:['src/*.html']
};

var watchedBrowserify = watchify(browserify({
    basedir: '.',
    debug: true,
    entries: ['src/main.ts'],
    cache: {},
    packageCache: {}
}).plugin(tsify));

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("dist"));
});

function bundle () {
    return watchedBrowserify
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
}

gulp.task("default", gulp.series(["copy-html"],bundle));
// 每次TypeScript文件改变时Browserify会执行bundle函数。
watchedBrowserify.on("update",bundle);
// 将日志打印到控制台。
watchedBrowserify.on("log",gutil.log);

/*
// 增加了copy-html任务并且把它加作default的依赖项。 这样，当 default执行时，copy-html会被首先执行。
// 还修改了 default任务，让它使用tsify插件调用Browserify，而不是gulp-typescript。 方便的是，两者传递相同的参数对象到TypeScript编译器。 
gulp.task("default", gulp.series(["copy-html"],function () {
    return browserify({
        basedir: '.',
        debug: true, // 这会让 tsify在输出文件里生成source maps。 source maps允许我们在浏览器中直接调试TypeScript源码，而不是在合并后的JavaScript文件上调试。 你要打开调试器并在 main.ts里打一个断点，看看source maps是否能工作。 当你刷新页面时，代码会停在断点处，从而你就能够调试 greet.ts。
        entries: ['src/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js')) // 调用bundle后，我们使用source（vinyl-source-stream的别名）把输出文件命名为bundle.js
    .pipe(gulp.dest("dist"));

    // 初级
    // return tsProject.src()
    //     .pipe(tsProject())
    //     .js.pipe(gulp.dest("dist"));
}));
*/