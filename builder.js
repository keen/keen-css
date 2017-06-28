'use strict'

const fs = require('fs');

const postcss = require('postcss')
const cssnano = require('cssnano');
const rmComments = require('postcss-discard-comments');

const plugins = [
  require('css-mqpacker')(),
  require('perfectionist')(),
  require('autoprefixer')(),
  require('postcss-import')(),
  require('postcss-custom-media')(),
  require('postcss-css-variables')(),
  require('postcss-conditionals')(),
  require('postcss-nesting')(),
  require('postcss-apply')(),
  require('postcss-wrap')({ selector: '.keen-analytics' })
];

const perfectionistOptions = {
	format: 'compact',
	trimTrailingZeros: false
}

const rawCss = fs.readFileSync('./src/base.css', 'utf8');

postcss(plugins).process(rawCss).then(result => {
  let warnings = result.messages.filter(message => { return message.type === 'warning' });
  warnings.forEach(warning => {
    console.log(`Warning: ${warning.text}`);
  });
  fs.writeFileSync(__dirname + '/css/keen.css', result.css);
});

plugins.push(cssnano())
plugins.push(rmComments())

postcss(plugins).process(rawCss).then(result => {
  fs.writeFileSync(__dirname + '/css/keen.min.css', result.css);
});

