# DraftJS Markup Plugin

*This is a plugin for the `draft-js-plugins-editor`.*

This plugin allows you to use markup (* for bold and _ for italic) in your editor!

Usage:

```js
import createMarkupPlugin from 'draft-js-markup-plugin';

const markupPlugin = createMarkupPlugin({ markups });
```

### Webpack Usage
Follow the steps below to import the css file by using Webpack's `style-loader` and `css-loader`.

1. Install Webpack loaders: `npm install style-loader css-loader --save-dev`
2. Add the below section to Webpack config (if your Webpack already has loaders array, simply add the below loader object(`{test:foo, loaders:bar[]}`) as an item in the array).

    ```js
    module: {
      loaders: [{
        test: /\.css$/,
        loaders: [
          'style', 'css'
        ]
      }]
    }
    ```

3. Restart Webpack.

### Browserify Usage

TODO: PR welcome
