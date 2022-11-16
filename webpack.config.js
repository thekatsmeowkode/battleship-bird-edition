const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, 'src/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: '[name][ext]',
        clean:true,
    },
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 8080, 
        open: true,
        hot: true,
        // watchContentBase: true,
    },
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(svg|png|ico|webp|jpg|jpeg|gif)$/, type:'asset/resource'},
            {test: /\.js$/, 
            exclude: /node-modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            }}
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Battleship:Bird Edition',
            filename: 'index.html', 
            template: path.resolve(__dirname, 'src/index.html')
        })
    ]
}