const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: './src/js/index.js',
        goodsList: './src/js/goodsList.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        limit: 10240
                    }
                }]
            },
        ]
    },
    devServer: {
        contentBase: './dist',
        open: true,
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            chunks: ['index'],
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new HtmlWebpackPlugin({
            filename: 'goodsList.html',
            chunks: ['goodsList'],
            minify: {
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            hash: true,
            template: './src/goodsList.html'
        }),
        new ExtractTextPlugin("[name].css"),
        new WriteFilePlugin(),
        new CopyWebpackPlugin([{
                from: 'src/img',
                to: './src/img'
            },
            {
                from: 'src/api',
                to: './src/api'
            }
        ]),

    ],
    mode: 'production'
};