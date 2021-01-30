const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const isEnvProduction = process.env.NODE_ENV === 'production';
const isEnvDevelopment = process.env.NODE_ENV === 'development';

const electronConfig = {
    // Build Mode
    mode: isEnvProduction ? 'production' : 'development',
    devtool: isEnvDevelopment ? 'inline-source-map' : false,
    // Electron Entrypoint
    entry: './src/main.ts',
    target: 'electron-main',
    resolve: {
        alias: {
            ['@']: path.resolve(__dirname, 'src')
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [{
            test: /\.ts$/,
            include: /src/,
            use: [{ loader: 'ts-loader' }]
        }]
    },
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    }
};

if (isEnvProduction) {
    electronConfig.plugins = [
        new CopyPlugin({
            patterns: [
                {
                    from: 'package.json',
                    to: 'package.json',
                    transform: (content, _path) => { // eslint-disable-line no-unused-vars
                        const jsonContent = JSON.parse(content);

                        delete jsonContent.devDependencies;
                        delete jsonContent.scripts;
                        delete jsonContent.build;

                        jsonContent.main = './main.js';
                        jsonContent.scripts = { start: 'electron ./main.js' };
                        jsonContent.postinstall = 'electron-builder install-app-deps';

                        return JSON.stringify(jsonContent, undefined, 2);
                    },
                },
            ],
        }),
    ];
}
module.exports = electronConfig;
