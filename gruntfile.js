/**
 * Created by vs on 10.05.2014.
 */


var src = {
  components:[
    'bower_components/jquery/dist/jquery.js',
    'bower_components/underscore/jquery.js',
    'bower_components/bootstrap/js/alert.js',
    'bower_components/bootstrap/js/dropdown.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-route/angular-route.js'
  ],
  common: [
    'public/common/**/*.js'
  ]
}

module.exports = function(grunt) {
  grunt.initConfig({
    less : {
      components: {
        options: {
          modifyVars: {
            'icon-font-path': '"http://mycdn.com/path/to/images"'
          }
        },
        files: {
          "build/bootstrap.css": [
            "bower_components/bootstrap/less/bootstrap.less"
            ]
        }
      }
    },
    watch: {
      files: 'public/common/**/*.js',
      tasks: ['concat:common', 'uglify:common']
    },
    cssmin:{
      components:{
        files: {
          'public/components.min.css': ['build/bootstrap.css']
        }
      }
    },
    uglify: {
      options:{
        sourceMap:true
      },
      components:{
        files: {
          'public/components.min.js': ['build/components.js']
        }
      },
      common:{
        files: {
          'public/common.min.js': ['build/common.js']
        }
      }
    },
    concat: {
      components: {
        src: src.components,
        dest: 'build/components.js'
      },
      common: {
        src: src.common,
        dest: 'build/common.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Default task(s).
  grunt.registerTask('components', ['concat:components', 'less:components', 'cssmin:components', 'uglify:components']);
  grunt.registerTask('appComon', ['concat:common', 'uglify:common']);
  grunt.registerTask('default', ['components', 'appComon']);
};
