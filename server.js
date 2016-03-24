var webpack = require('webpack');
var config = require('./webpack.config');

var WebpackDevServer = require('webpack-dev-server');
process.env.NODE_ENV = 'production';

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
}).listen(3030, 'localhost', function (err) {
    if (err) {
        console.log(err);
    }

    console.log('Listening at localhost:3030');
});
