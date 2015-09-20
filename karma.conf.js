// Karma configuration
// Generated on Sat Sep 05 2015 14:34:00 GMT+0300 (RTZ 2 (зима))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha',
      'chai-as-promised',
      'sinon-chai',
      'chai'
    ],


    // list of files / patterns to load in the browser
    files: [
      'public/scripts/helpers.js',
      'public/3dParty/lodash/lodash.min.js',
      'public/3dParty/angular/angular.min.js',
      //'public/3dParty/angular/angular-resource.min.js',
      //'public/3dParty/angular/angular-animate.min.js',
      'public/3dParty/angular-mocks/angular-mocks.js',
      //'public/3dParty/ui-layout/ui-layout.js',
      'public/3dParty/angular-ui-router/release/angular-ui-router.min.js',
      'public/3dParty/toaster/toaster.js',
      'public/3dParty/angular-drag-and-drop-lists/angular-drag-and-drop-lists.min.js',
      'public/scripts/**/*.js',
      'public/app/*.js',
      'public/app/components/**/*.js',
      'public/app/directives/**/*.js',
      'public/tests/**/*.utest.js'  ,
      'public/app/**/*.html'
    ],

    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'public/app/**/*.html': ['ng-html2js']
    },

    ngHtml2JsPreprocessor: {
      // strip this from the file path
      stripPrefix: 'public/',
      moduleName: 'templates'
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
