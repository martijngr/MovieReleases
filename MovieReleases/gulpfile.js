	// Include gulp
	var gulp = require('gulp');

	// Include Our Plugins
	//var jshint = require('gulp-jshint');
	//var sass = require('gulp-sass');
	var concat = require('gulp-concat');
	var uglify = require('gulp-uglify');
	var rename = require('gulp-rename');
	var sourcemaps = require('gulp-sourcemaps');
	var karma = require('gulp-karma');

	// Concatenate & Minify JS
	gulp.task('scripts', function () {
		return gulp.src(['Angular/js/app.js',  'Angular/js/**/*.js'])
			.pipe(sourcemaps.init())
				.pipe(concat('all.js'))
				.pipe(gulp.dest('Scripts/min'))
				.pipe(rename('all.min.js'))
				.pipe(uglify())
			.pipe(sourcemaps.write('maps'))
			.pipe(gulp.dest('Scripts/min'));
	});

	//gulp.task('scripts', function () {
	//    return gulp.src(['Angular/js/app.js',  'Angular/js/**/*.js'])
	//        .pipe(concat('all.js'))
	//        .pipe(gulp.dest('Scripts/min'))
	//        .pipe(rename('all.min.js'))
	//        .pipe(uglify())
	//        .pipe(gulp.dest('Scripts/min'));
	//});

	

/* 	gulp.task('test', function() {
	  // Be sure to return the stream
	  // NOTE: Using the fake './foobar' so as to run the files
	  // listed in karma.conf.js INSTEAD of what was passed to
	  // gulp.src !
	  return gulp.src('Scripts/test/*.js')
		.pipe(karma({
		  configFile: 'karma.conf.js',
		  action: 'watch'
		}))
		.on('error', function(err) {
		  // Make sure failed tests cause gulp to exit non-zero
		  console.log(err);
		  throw err;
		});
	}); */

	// Watch Files For Changes
	gulp.task('watch', function () {
		gulp.watch(['Angular/js/**/*.js'], ['scripts']);
	});
	
	// Default Task
	gulp.task('default', ['scripts', 'watch']);