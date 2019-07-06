const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
	entry: {
		bundle: './src/index.js'
	},
	resolve: {
    mainFields: ['browser', 'main', 'module'],
		extensions: ['.js', '.svelte']
	},
	output: {
		path: __dirname + '/public',
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
  devServer: {
    contentBase: __dirname + '/public',
  },
	module: {
		rules: [
			{
				test: /\.svelte$/,
				exclude: /node_modules/,
				use: {
					loader: 'svelte-loader',
					options: {
						hotReload: true,
            emitCss: prod
					}
				}
			},
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
		]
	},
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    }),
    new MiniCssExtractPlugin('styles.css')
  ],
	mode,
	devtool: prod ? false : 'source-map'
};
