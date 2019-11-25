const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin')


const devMode = process.env.NODE_ENV !== 'production';

const rootPath = path.resolve(__dirname, '..');

const config = {
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      chunks: "all"
    }
  },
  entry: {
    index: path.join(rootPath, 'src/index.js'),
    main: path.join(rootPath, 'src/main.js')
  },
  output: {
    path: path.join(rootPath, 'dist'),
    filename: '[name]_[hash:8].js'
  },
  devServer: {
    contentBase: path.join(rootPath, 'dist'),
    hot: true,
    // open: true,
    port: 3001,
    compress: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              publicPath: 'static',
              outputPath: 'static',
              limit: 10000
            }
          }
        ]
      },
      {
        // 配置的是用来解析.css文件的loader，css-loader、style-loader
        // loader的顺序 默认是从右往左，从上到下
        // css-loader 解析 @import 这种语法的
        // style-loader 将css引入html的head中 style标签
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: './',  
              hmr: process.env.NODE_ENV === 'development', // 仅dev环境启用HMR功能
            },
          },
          'css-loader',
          'postcss-loader'
        ] // webpack底层调用这些loader的顺序是从右向左
      },
      {
        // npm i -D less less-loader
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',  
            hmr: process.env.NODE_ENV === 'development', // 仅dev环境启用HMR功能
          },
        }, 'css-loader','postcss-loader', 'less-loader']
      },
      {
        // npm i -D sass-loader node-sass
        test: /\.scss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',  
            hmr: process.env.NODE_ENV === 'development', // 仅dev环境启用HMR功能
          },
        }, 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.BannerPlugin('王耀的版权信息'),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      // 数组，接收多个对象
      { 
        from: path.join(rootPath, 'static'),
        to: path.join(rootPath, 'dist/static'),
        ignore: ['c.js']
      }
    ]),
    new HtmlWebpackPlugin({
      title: '我是插件生成的标题', // 生成html文件的标题,title标签内容（模板的优先级更高）
      filename: 'index.html', // 就是html文件的文件名，默认是index.html, 还可以插入路径：如： html/app.html
      template: path.join(rootPath, 'index.html'), // 指定你生成的文件所依赖哪一个html文件模板，模板类型可以是html、jade、ejs等
      // true 默认值，script标签位于html文件的 body 底部
      // body script标签位于html文件的 body 底部
      // head script标签位于html文件的 head中
      // false 不插入生成的js文件，这个几乎不会用到的
      inject: 'body',
      favicon: path.join(rootPath, '60.png'), // 给你生成的html文件生成一个 favicon ,值是一个路径
      // chunks主要用于多入口文件，当你有多个入口文件，那就回编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
      // chunks: [], // 如果你没有设置chunks选项，那么默认是全部显示
      excludeChunks: [], // 排除掉一些js
      meta: {
        viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
      }
    })
  ]
}

module.exports = config;
