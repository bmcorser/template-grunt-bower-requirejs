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
    }
  });
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('build', [
    'jshint',
    'requirejs',
  ]);
};
