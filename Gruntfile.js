/*
Gruntfile email config
1/ less module
2/ unuse css module to remove unused css
3/ premailer to inline style.
*/


module.exports = function(grunt) {
grunt.initConfig({
pkg: grunt.file.readJSON('package.json'),
// Takes your scss files and compiles them to css
// Inlines your css
premailer: {
  main: {
    options: {
      verbose: true,
    },
    files: {
      'dist/index.html': ['index.html']
    }
  }
},

less: {
development: {
options: {
        paths: ["assets/css"]
    },
    files: {
        "css/main.css": "less/main.less"
    }
}
},

uncss: {
  dist: {
    src: 'index.html',
    dest: 'dist/css/main.css',
    options: {
      report: 'min' // optional: include to report savings
    }
  }
},

// Watches for changes to css or email templates then runs grunt tasks
watch: {
  files: ['src/css/less/*'],
  tasks: ['default']
}
});

// Where we tell Grunt we plan to use this plug-in.
grunt.loadNpmTasks('grunt-premailer');
grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-uncss');


// Where we tell Grunt what to do when we type "grunt" into the terminal.
grunt.registerTask('email', ['less','uncss', 'premailer']);
};
