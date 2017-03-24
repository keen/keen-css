module.exports = {
  entry: './src/base.css',
  output: {
    filename: 'keen.css',
    path: __dirname + '/css/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: 'inline'
            }
          }
        ] 
      }
    ]
  }
};
