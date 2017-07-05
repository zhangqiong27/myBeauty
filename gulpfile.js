//1、加载gulp包
var gulp = require("gulp");


//2、写个copy文件的任务
gulp.task("copy-index",function(){
	//gulp.src("index.html").pipe(gulp.dest("dist"));
	//把开发的代码部署到服务器上。
	gulp.src("*.html").pipe(gulp.dest("D:/phpStudy/WWW/Beauty"));
});

gulp.task("copy-images",function(){
	gulp.src("img/index/*").pipe(gulp.dest("D:/phpStudy/WWW/Beauty/img/index"));
	gulp.src("img/newGoods/*").pipe(gulp.dest("D:/phpStudy/WWW/Beauty/img/newGoods"));
	gulp.src("img/goodsInf/*").pipe(gulp.dest("D:/phpStudy/WWW/Beauty/img//goodsInf"));
	
});

gulp.task("copy-php",function(){
	gulp.src("php/*.php").pipe(gulp.dest("D:/phpStudy/WWW/Beauty/php/"));
});

gulp.task("copy-js",function(){
	gulp.src("js/*.js").pipe(gulp.dest("D:/phpStudy/WWW/Beauty/js/"));
});

gulp.task("copy-css",function(){
	gulp.src("css/*.css").pipe(gulp.dest("D:/phpStudy/WWW/Beauty/css/"));
});



//监听
gulp.task("watchAll",function(){
	gulp.watch("*.html",["copy-index"]);
	gulp.watch("img/*",["copy-images"]);
	gulp.watch("php/*.php",["copy-php"]);
	gulp.watch("js/*.js",["copy-js"]);
	gulp.watch("css/*.css",["copy-css"]);
});

