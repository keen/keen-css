'use strict'

const fs = require('fs');

const postcss = require('postcss')
const cssnano = require('cssnano')
const queries = require('css-mqpacker')
const perfect = require('perfectionist')
const prefixer = require('autoprefixer')
const atImport = require('postcss-import')
const media = require('postcss-custom-media')
const vars = require('postcss-css-variables')
const conditionals = require('postcss-conditionals')
const rmComments = require('postcss-discard-comments')

const perfectionistOptions = {
	format: 'compact',
	trimTrailingZeros: false
}

const plugins = [
	atImport(), vars(), conditionals(), media(), queries(), perfect(perfectionistOptions), prefixer()
]

const rawCss = fs.readFileSync('./src/base.css', 'utf8');

postcss(plugins).process(rawCss).then(result => {
  fs.writeFileSync(__dirname + '/css/keen.css', result.css);
});

plugins.push(cssnano())
plugins.push(rmComments())

postcss(plugins).process(rawCss).then(result => {
  fs.writeFileSync(__dirname + '/css/keen.min.css', result.css);
});

