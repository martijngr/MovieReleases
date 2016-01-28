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
	var less = require('gulp-less');
	
	// Concatenate & Minify JS
	gulp.task('scripts', function () {
		return gulp.src(['Angular/ts/app/app.js', 'Movie/**/*.js', 'Watchlist/**/*.js', 'Angular/js/**/!(app)*.js'])
			.pipe(sourcemaps.init())
				.pipe(concat('all.js'))
				.pipe(gulp.dest('Scripts/min'))
				.pipe(rename('all.min.js'))
				.pipe(uglify())
			.pipe(sourcemaps.write('maps'))
			.pipe(gulp.dest('Scripts/min'));
	});
	
	gulp.task('styles', function () {
		return gulp.src(['Content/Site.less', 'Content/bootstrap/bootstrap.less'])
			.pipe(less())
			.pipe(gulp.dest('Content'));
	});

	// Watch Files For Changes
	gulp.task('watch', function () {
		gulp.watch(['Angular/js/**/*.js', 'Movie/**/*.js', 'Watchlist/**/*.js', 'Content/Site.less', 'Content/bootstrap/variables.less'], ['scripts', 'styles', 'styles']);
	});
	
	// Default Task
	gulp.task('default', ['scripts', 'styles', 'watch']);