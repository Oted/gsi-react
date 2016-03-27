var webpack = require('webpack');
var path    = require('path');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + '/public/',
        filename: "bundle.js"
    },
    plugins: process.env.NODE_ENV === 'production' ? [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ] : [],
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/,
            include: __dirname
        }, {
            test: /\.js$/,
            loaders: ['react-hot', 'babel'],
            include: path.join(__dirname, './', './', 'src')
        }, {
            test: /\.css?$/,
            loaders: ['style', 'raw'],
            include: __dirname
        },
        {
            test: /\.json$/,
            loader: 'json'
        }]
    }
};
