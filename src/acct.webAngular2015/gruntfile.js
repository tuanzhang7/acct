/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    // load Grunt plugins from NPM
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // configure plugins
    grunt.initConfig({
        
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: { 'wwwroot/app.js': ['Scripts/app.js', 'Scripts/controllers/*.js', 'Scripts/services/*.js'] }
            },
            target: {
                files: { 'wwwroot/combine.js': ['Scripts/thirdParty/*.js'] }
            }
        },
        
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'wwwroot/css/output.css': ['CSS/*.css', 'CSS/**/*.css']
                }
            }
        },
        watch: {
            scripts: {
                files: ['Scripts/**/*.js'],
                tasks: ['uglify']
            },
            css: {
                files: ['CSS/**/*.css'],
                tasks:['cssmin']
            }
        }
    });

    // define tasks
    grunt.registerTask('default', ['uglify', 'cssmin', 'watch']);
};