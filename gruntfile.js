/**
 * Created by vs on 10.05.2014.
 */
module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      files: 'public/common/**/*.js',
      tasks: ['concat:common', 'uglify:common']
    },
    uglify: {
      options:{
        sourceMap:true
      },
      components:{
        files: {
          'public/components.min.js': ['public/components.js']
        }
      },
      common:{
        files: {
          'public/common.min.js': ['public/common.js']
        }
      }
    },
    concat: {
      components: {
        src: [
          'public/components/jquery/dist/jquery.js',
          'public/components/underscore/jquery.js',
          'public/components/bootstrap/dist/js/bootstrap.js',
          'public/components/angular/angular.js',
          'public/components/angular-resource/angular-resource.js',
          'public/components/angular-route/angular-route.js',
        ],
        dest: 'public/components.js'
      },
      common: {
        src: [
          'public/common/**/*.js',
        ],
        dest: 'public/common.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
};
