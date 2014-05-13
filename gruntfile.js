/**
 * Created by vs on 10.05.2014.
 */


var src = {
  components: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/underscore/jquery.js',
    'bower_components/bootstrap/js/alert.js',
    'bower_components/bootstrap/js/dropdown.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-route/angular-route.js'
  ]
};

module.exports = function (grunt) {
  'use strict';
  grunt.initConfig({
    less: {
      components: {
        options: {
          modifyVars: {
            'icon-font-path': '"/fonts/"',
            'fa-font-path': '"/fonts"'
          }
        },
        files: {
          "build/bootstrap.css": "bower_components/bootstrap/less/bootstrap.less",
          'build/fontawesome.css': 'bower_components/fontawesome/less/font-awesome.less'
        }
      }
    },
    watch: {
      files: ['lib/client/**/*.js'],
      tasks: ['appComon', 'appAdmin']
    },
    cssmin: {
      components: {
        files: {
          'build/components.min.css': ['build/bootstrap.css', 'build/fontawesome.css']
        }
      }
    },
    uglify: {
      options: {
        sourceMap: true
      },
      components: {
        files: {
          'build/components.min.js': ['build/components.js']
        }
      },
      common: {
        files: {
          'build/common.min.js': ['build/common.js']
        }
      },
      admin: {
        options: {
          mangle: false
        },
        files: {
          'build/admin.min.js': ['build/admin.js']
        }
      }
    },
    concat: {
      components: {
        src: src.components,
        dest: 'build/components.js'
      },
      common: {
        src: ['lib/client/common/**/*.js'],
        dest: 'build/common.js'
      },
      admin: {
        files: {
          'build/admin.js': [
            'lib/client/admin/controllers/**/*.js',
            'lib/client/admin/app.js',
            'build/admin-templates.js'
          ]
        }
      }
    },
    copy: {
      components: {
        files: [
          {src: ['build/components.min.css'], dest: 'public/components.min.css', filter: 'isFile', flatten: true},
          {src: ['build/components.js'], dest: 'public/components.js', filter: 'isFile', flatten: true},
          {src: ['build/components.min.js'], dest: 'public/components.min.js', filter: 'isFile', flatten: true},
          {src: ['build/components.min.map'], dest: 'public/components.min.map', filter: 'isFile', flatten: true},
          {src: ['bower_components/bootstrap/fonts/*'], dest: 'public/fonts/', filter: 'isFile', expand: true, flatten: true},
          {src: ['bower_components/fontawesome/fonts/*'], dest: 'public/fonts/', filter: 'isFile', expand: true, flatten: true}
        ]
      },
      admin: {
        files: [
          {src: ['lib/client/admin/index.html'], dest: 'public/admin/index.html', filter: 'isFile', flatten: true},
          {src: ['build/admin.js'], dest: 'public/admin.js', filter: 'isFile', flatten: true},
          {src: ['build/admin.min.js'], dest: 'public/admin.min.js', filter: 'isFile', flatten: true},
          {src: ['build/admin.min.map'], dest: 'public/admin.min.map', filter: 'isFile', flatten: true}
        ]
      },
      common: {
        files: [
          {src: ['build/common.js'], dest: 'public/common.js', filter: 'isFile', flatten: true},
          {src: ['build/common.min.js'], dest: 'public/common.min.js', filter: 'isFile', flatten: true},
          {src: ['build/common.min.map'], dest: 'public/common.min.map', filter: 'isFile', flatten: true}
        ]
      }
    },

    clean: ["build", 'public'],
    ngtemplates:{
      app:{
        options:  {
          htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true },
          url:    function(url) { return url.replace('lib/client', ''); }
        },
        src: 'lib/client/admin/templates/**/*.html',
        dest: 'build/admin-templates.js'
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-angular-templates');
  // Default task(s).
  grunt.registerTask('components', ['concat:components', 'less:components', 'cssmin:components', 'uglify:components', 'copy:components']);
  grunt.registerTask('appComon', ['concat:common', 'uglify:common', 'copy:common']);
  grunt.registerTask('appAdmin', ['ngtemplates:app', 'concat:admin', 'uglify:admin', 'copy:admin']);
  grunt.registerTask('default', ['components', 'appComon', 'appAdmin']);
};
