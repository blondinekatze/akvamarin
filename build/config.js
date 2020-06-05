module.exports = {
    env: 'development',

    entries: [{
        name: 'main',
        styles: {
            src: './src/assets/scss/main.scss',
            watch: [
                './src/assets/scss/**/*.scss',
                '!./src/assets/scss/vendor.scss',
                './src/blocks/**/*.scss'
            ]
        },
        scripts: {
            src: './src/assets/js/main.js',
            watch: [
                './src/assets/js/**/*.js',
                '!./src/assets/js/vendor.js',
                './src/blocks/**/*.js'
            ]
        }
    }, {
        name: 'vendor',
        styles: {
            src: './src/assets/scss/vendor.scss',
            watch: './src/assets/scss/vendor.scss'
        },
        scripts: {
            src: './src/assets/js/vendor.js',
            watch: './src/assets/js/vendor.js'
        }
    }]
};