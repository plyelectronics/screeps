module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'ply.electronics@gmail.com',
                password: 'screeps15!',
                branch: 'CScreepsPublic',
                ptr: false
            },
            dist: {
                src: ['dist/*.js']
		//src: ['/home/logan/git-files/screeps/*.js']
            }
        }
    });
}
