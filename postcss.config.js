module.exports = {
  plugins: [
    require('postcss-devtools'),
    require('postcss-import'),
    require('postcss-css-variables'),
    require('perfectionist'),
    require('autoprefixer'),
    require('postcss-custom-media'),
    require('postcss-conditionals'),
    require('postcss-discard-comments')
  ]
}
