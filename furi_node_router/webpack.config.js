/**
 * FURI - Fast Uniform Resource Identifier
 *
 * The Fast and Furious Node Router
 * Copyright(c) 2016 Rajinder Yadav
 *
 * Labs DevMentor.org Corp. <info@devmentor.org>
 * This code is released as-is without warranty under the "GNU GENERAL PUBLIC LICENSE".
 */

// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.

const path = require("path");

const { CheckerPlugin } = require("awesome-typescript-loader");

module.exports = {
    devtool: 'source-map',
    context: path.resolve(__dirname, "src"),
    target: "node",
    entry: {
      furi: "./furi.ts",
      app: "./app.ts"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].js",
        sourceMapFilename: "[name].map"
    },
    resolve: {
        // Add '.ts' and '.tsx' as a resolvable extension.
        extensions: [".ts", ".tsx", ".js", ".jxs"]
    },
    module: {
        loaders: [
            // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
        ]
    },
    plugins: [
        new CheckerPlugin()
    ]
};
