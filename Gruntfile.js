module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'ply.electronics@gmail.com',
                password: 'screeps15!',
                //branch: 'CActivePub',
		branch: 'testbranch',
                ptr: false
            },
            dist: {
                src: ['dist/*']
            }
        }
    });
}
