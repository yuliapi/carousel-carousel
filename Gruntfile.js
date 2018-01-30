module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                },
                files: {
                    'src/css/styles.css': 'src/*scss'
                }
            }
        },
        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: ['last 1 version']})
                ]
            },
            dist: {
                files: {
                    "src/css/styles.css": "src/css/styles.css"
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        cwd: 'src/images',  // set working folder / root to copy
                        src: '**/*',           // copy all files and subfolders
                        dest: 'dist/images',    // destination folder
                        expand: true           // required when using cwd
                    },
                    {
                        cwd: 'src',  // set working folder / root to copy
                        src: '**/*.js',           // copy all files and subfolders
                        dest: 'dist',    // destination folder
                        expand: true           // required when using cwd
                    },
                    {
                        cwd: 'src',  // set working folder / root to copy
                        src: '**/*.html',           // copy all files and subfolders
                        dest: 'dist',    // destination folder
                        expand: true           // required when using cwd
                    },
                    {
                        cwd: 'src/css',  // set working folder / root to copy
                        src: '**/*',           // copy all files and subfolders
                        dest: 'dist/css',    // destination folder
                        expand: true           // required when using cwd
                    }]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 8', 'ie 9']
            },
            dist: {
                files: {
                    "src/css/styles.css": "src/css/styles.css"
                }
            }
        },
        // Clean task
        clean: {
            all: {
                src: ["dist/**/*"]
            }
        },
        watch: {
            options: {
                livereload: true
            },
            html: {
                files: ['src/index.html'],
                tasks: ['copy']
            },
            sass: {
                options: {
                    // Monitor Sass files for changes and compile them, but don't reload the browser.
                    livereload: true
                },
                files: ['src/*.scss'],
                tasks: ['sass', 'postcss']
            },
            js: {
                files: ['src/*.js'],
                tasks: ['copy']
            }
        }
    });

    // Actually running things.

    grunt.loadNpmTasks('grunt-contrib-copy');
    // Load the plugins to run your tasks
    require("load-grunt-tasks")(grunt, {
        scope: "devDependencies"
    });


    // Default task(s).
    grunt.registerTask("default", [
        "clean:all",
        "sass",
        "postcss",
        "copy",
        "watch"
    ]);

};