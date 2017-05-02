module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'), // the package file to use
 
    uglify: {
      files: {
        expand: true, 
        flatten: true, 
        src: 'src/js/*.js',
        dest: 'dist',
        ext: '.min.js'
      }
    },

    cssmin: {
      minify: {
        expand: true,
        cwd: 'src/css',
        src: ['*.css', '!*.min.css'],
        dest: 'dist',
        ext: '.min.css'
      }
    },

    qunit: {
        all: ['tests/*.html']
    },

    watch: {
      files: ['tests/*.js', 'tests/*.html', 'src/**'],
      tasks: ['default']
    },

    copy: {
      main: { 
        files: [
          // copy src to example
          { expand: true, cwd: 'bower_components', src: '**/*', dest: 'public/bower_components/' },
          { expand: true, cwd: 'src/css', src: '*', dest: 'public/css/' },
          { expand: true, cwd: 'src/js', src: '*', dest: 'public/js/' },
          { expand: true, cwd: 'data-repsview', src: '*', dest: 'public/data-repsview/' },
          // copy libs to test
          // copy latest libs to tests
          { expand: true, cwd: 'public/bower_components/jquery/dist', src: 'jquery.js', dest: 'tests/lib/' },
          { expand: true, cwd: 'public/bower_components/bootstrap-datepicker/js', src: 'bootstrap-datepicker.js', dest: 'tests/lib/' },
          // copy dist to tests
          // { expand: true, cwd: 'dist', src: '*', dest: 'tests/lib/' },
          { expand: true, cwd: 'src/css', src: '*', dest: 'tests/lib/' },
          { expand: true, cwd: 'src/js', src: '*', dest: 'tests/lib/' }
        ]
      }
    }
  });

  // load up your plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // register one or more task lists (you should ALWAYS have a "default" task list)
  grunt.registerTask('default', ['uglify','cssmin', 'copy'/*, 'qunit', 'watch'*/]);
  grunt.registerTask('test', 'qunit');
};
