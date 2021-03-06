import { ConfigurationFactory } from 'webpack'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'

const config: ConfigurationFactory = () => {
  return {
    entry: {
      content_scripts: path.join(__dirname, 'src', 'content_scripts.ts'),
      artworks_scripts: path.join(__dirname, 'src', 'artworks_scripts.ts'),
      idea_page_scripts: path.join(__dirname, 'src', 'idea_page_scripts.ts')
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js'
    },
    module: {
      rules: [
        {
          test: /.ts$/,
          use: 'ts-loader',
          exclude: '/node_modules/'
        }
      ]
    },
    resolve: {
      extensions: ['.ts', '.js']
    },
    plugins: [
      new CopyWebpackPlugin({
          patterns:[
            { from: 'public', to: '.' }
      ]})
    ]
  }
}

export default config 