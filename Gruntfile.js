module.exports = function(grunt) {

    grunt.initConfig({
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'src/assets/css/custom/style.min.css': ['src/assets/css/custom/style.css']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'src/assets/css/custom/style.css': 'src/scss/style.scss',
                    //'widgets.css': 'widgets.scss'
                }
            }
        },
        watch: {
            files: ['src/**/*.scss'],
            tasks: ['sass', 'cssmin']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass', 'cssmin']);
    grunt.registerTask('watch', ['sass', 'cssmin', 'watch']);
};