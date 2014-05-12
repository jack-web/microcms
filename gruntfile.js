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
            'icon-font-path': '"/fonts/"',
            'fa-font-path':'"/fonts/"'
          }
        },
        files: {
          "build/bootstrap.css":  "bower_components/bootstrap/less/bootstrap.less",
          'build/fontawesome.css': 'bower_components/fontawesome/less/font-awesome.less'
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
          'public/components.min.css': ['build/bootstrap.css','build/fontawesome.css']
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
    },
    copy:{
      components:{
        files:[
          {expand:true, src: ['bower_components/bootstrap/fonts/*'], dest: 'public/fonts/', filter: 'isFile', flatten: true},
          {expand:true, src: ['bower_components/fontawesome/fonts/*'], dest: 'public/fonts/', filter: 'isFile', flatten: true}
        ]
      }
    },
    clean: ["build"]
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  // Default task(s).
  grunt.registerTask('components', ['concat:components', 'less:components', 'cssmin:components', 'uglify:components', 'copy:components', 'clean']);
  grunt.registerTask('appComon', ['concat:common', 'uglify:common', 'clean']);
  grunt.registerTask('default', ['components', 'appComon']);
};
