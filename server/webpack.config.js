const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
        ],
    },
    devtool: false,
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            child_process: "empty",
            fs: false,
            http: false,
            https: false,
            tls: false,
            net: false,
            crypto: false,
            path: false,
            os: false,
            stream: false,
            zlib: false,
            lib: false,
            buffer: false,
            util: false,
            bin: false,
        },
    },
    devServer: {
        contentBase: "./dist",
        port: 5000,
    },
    entry: "./src/index.ts",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new NodemonPlugin({
            script: "./dist/main.js",
        }),
    ],
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};
