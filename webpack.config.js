const path = require("path");
const {WebpackPluginServe: Serve} = require('webpack-plugin-serve');
const outputPath = path.resolve('./build');

const options = {
    static: [outputPath, path.resolve('./static')],
    host: "localhost",
    progress: "minimal",
    port: 5555,
    liveReload: true
}
module.exports = {
    entry: [
        "./src/index.js",
        'webpack-plugin-serve/client'
    ],
    output: {
        path: outputPath,
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js"],
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [
        new Serve(options)
    ],
    watch: true
}