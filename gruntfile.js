/**
 * Created by vs on 10.05.2014.
 */
module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options:{
        sourceMap:true
      },
      build: {
        src: 'public/components.js',
        dest: 'public/components.min.js'

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
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  // Default task(s).
  grunt.registerTask('default', ['concat:components', 'uglify']);
};
