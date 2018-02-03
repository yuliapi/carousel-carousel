module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            server: {
                options: {
                    port: 8000,
                    hostname: 'localhost',
                    open: {
                        target: 'http://localhost:8000'
                    },
                    base: "src"
                }
            },
        },
        responsive_images: {
            myTask: {
                options: {
                    engine: 'gm',
                    sizes: [
                        {
                            name: 'small',
                            width: '480',
                            quality: 40
                        }, {

                            name: 'large',
                            height: '515',
                            quality: 40
                        }],
                },
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png}'],
                    cwd: 'src/images/source',
                    dest: 'src/images/'
                }]
            }
        },


        sass: {
            dist: {
                options: {},
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
                        cwd: 'src/images/',  // set working folder / root to copy
                        src: '**/*.jpg',           // copy all files and subfolders
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
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Load the plugins to run your tasks
    require("load-grunt-tasks")(grunt, {
        scope: "devDependencies"
    });


    // Default task(s).
    grunt.registerTask("default", [
        'responsive_images',
        "clean:all",
        "sass",
        "postcss",
        "copy",
        "connect:server",
        "watch"
    ]);

};
