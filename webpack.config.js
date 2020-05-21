var path = require('path')
var webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: {
    index: [ path.resolve(__dirname, './src/index.js') ]
    },

    module: {
        rules: [
            { test: /\.scss$/, loaders: ['style-loader', 'css-loader','sass-loader']},
            // use babel-loader for js files
            { test: /\.js$/, loader: 'babel-loader' },
            // use vue-loader for .vue files
            { test: /\.vue$/, loader: 'vue-loader' },
            // use css-loader for .css files
            { test: /\.css/, loader: ['style-loader', 'css-loader'] },
            // use url-loader for .(png|jpe?g|gif|svg) files
            { test: /\.(png|jpe?g|gif|svg)(\?.*)?$/, loader: 'url-loader' }
        ]
    },

    context: __dirname,
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "vue-thumbs.min.js",
        // chunkFilename: "[id].chunk.js",
        library: 'VueThumbs',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },

    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin()
    ]
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
