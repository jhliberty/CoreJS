module.exports = function (config) {
    config.set({
        basePath: '',

        frameworks: ['jasmine', 'commonjs'],

        // list of files / patterns to load in the browser
        files: [
            'app/js/bower_components/jquery/jquery.js',
            'app/js/{,*/}*.js',
            'test/spec/{,*/}*.js'
        ],

        // list of files / patterns to exclude
        exclude: [
            'app/js/_build.js',
            'app/js/externs/*.js'
        ],

        preprocessors: {
            'app/js/*.js'      : ['commonjs'],
            'test/spec/**/*.js': ['commonjs']
        },

        port: 8080,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        browsers: ['Chrome'],

        singleRun: false
    });
};
