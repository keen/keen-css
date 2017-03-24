module.exports = {
  plugins: [
    require('perfectionist'),
    require('autoprefixer'),
    require('postcss-import'),
    require('postcss-custom-media'),
    require('postcss-css-variables'),
    require('postcss-conditionals'),
    require('postcss-discard-comments')
  ]
}
