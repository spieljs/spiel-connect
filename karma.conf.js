module.exports = function(config) {
    config.set({
        browsers: ['jsdom', 'Firefox', 'Chrome', 'Opera'],
        frameworks: ['mocha', 'karma-typescript'],
        files: [
            "src/**/*.ts",
            "test/**/**.ts",
        ],
        preprocessors: {
            "**/*.ts": "karma-typescript",
            "**/*.tsx": "karma-typescript"
        },

        exclude: [
            "lib/**"
        ],

        reporters: ['karma-typescript', 'coverage', 'remap-coverage','mocha'],
        port: 9876,
        autoWatch: true,
        karmaTypescriptConfig: {
            compilerOptions: {
                "target": "es5",
                "lib": [
                    "es6",
                    "dom"
                ],
                "module": "commonjs",
                "strict": true,
                "emitDecoratorMetadata": true,
                "experimentalDecorators": true,
                "declaration": true,
                "jsx": "react",
                "jsxFactory": "h",
                "sourceMap": true
            }
        },
        remapCoverageReporter: {
            'text-summary': null,
            html: './coverage/html',
            cobertura: './coverage/cobertura.xml'
        },

        mochaReporter: {
            output: 'full'
        },

        singleRun: true
    });
}
