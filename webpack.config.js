const webpack = require('webpack');

const port = process.env.PORT || 3000;

module.exports = {
    mode: 'development',
    entry: __dirname + '/src/index.js',
    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },
    devtool: 'inline-source-map',

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    }
}
