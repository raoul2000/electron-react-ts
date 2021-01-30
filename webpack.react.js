const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';
const isTargetWeb = process.env.TARGET === 'web';

module.exports = {
    mode: isEnvProduction ? 'production' : 'development',
    entry: './src/renderer.tsx',
    target: isTargetWeb ? 'web' : 'electron-renderer',
    devtool: isEnvDevelopment ? 'inline-source-map' : false,
    devServer: {
        contentBase: path.join(__dirname, 'dist/renderer.js'),
        compress: true,
        port: isTargetWeb ? 9000 : 9090
    },
    resolve: {
        alias: {
            ['@']: path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: /src/,
                use: [{ loader: 'ts-loader' }]
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'asset/fonts/[hash][ext]'
                }
            },
            {
                test: /\.(svg|ico|icns)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'asset/graphics/[hash][ext]'
                }
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'asset/images/[hash][ext]'
                }
            }
        ]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'renderer.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
