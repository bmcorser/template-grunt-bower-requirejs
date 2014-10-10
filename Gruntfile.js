var BUILD_DIR = './_build';
var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['./js/*.js'],
      options: {
        force: true,
        reporter: require('jshint-stylish'),
        ignores: ['./js/require.js']
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './js',
          dir: path.join(BUILD_DIR, 'js'),
          optimize: 'none'
        }
      }
    },
    watch: {
      main: {
        files: ['./markup/**/*', './js/**/*'],
        tasks: ["build"],
        options: {
          reload: true,
          spawn: false
        }
      }
    },
    bower: {
      all: {
        rjsConfig: 'js/config.js',
        options: {
          baseUrl: './'
        }
      },
    },
    copy: {
      bower: {
        expand: true,
        src: [
          './bower_components/**/*.js',
          './bower_components/**/*.map'
        ],
        dest: BUILD_DIR,
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('build', [
    'copy',
    'bower',
    'jshint',
    'requirejs',
  ]);
};
