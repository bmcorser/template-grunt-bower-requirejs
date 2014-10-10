var BUILD_DIR = './_build';
var path = require('path');

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['./app/js/*.js'],
      options: {
        force: true,
        reporter: require('jshint-stylish'),
        ignores: ['./app/js/require.js']
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: './app/js',
          dir: path.join(BUILD_DIR, 'js'),
          optimize: 'none'
        }
      }
    },
    watch: {
      main: {
        files: ['./app/templates/**/*', './app/js/**/*'],
        tasks: ["build"],
        options: {
          reload: true,
          spawn: false
        }
      }
    },
    bower: {
      all: {
        rjsConfig: 'app/js/config.js',
        options: {
          baseUrl: './js'
        }
      },
    },
    copy: {
      bower_components: {
        expand: true,
        src: [
          './bower_components/**/*.js',
          './bower_components/**/*.map'
        ],
        dest: path.join(BUILD_DIR, 'js'),
      },
      templates: {
        expand: true,
        flatten: true,
        src: './app/templates/**/*',
        dest: BUILD_DIR
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-bower-requirejs');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('build', [
    'bower',
    'jshint',
    'requirejs',
    'copy',
  ]);
};
