const { registerTransforms } = require('@tokens-studio/sd-transforms');
const StyleDictionary = require('style-dictionary');

registerTransforms(StyleDictionary);

function transformDimensionRem(value) {
  if (value === undefined) {
    return value;
  }
  if (`${value}`.endsWith('px')) {
    return `${value}`;
  }
  return `${value}rem`;
}
StyleDictionary.registerTransform({
  name: 'ts/size/rem',
  type: 'value',
  transitive: true,
  matcher: token =>
    ['sizing', 'spacing', 'borderRadius', 'borderWidth', 'fontSizes', 'dimension'].includes(
      token.type,
    ),
  transformer: token => transformDimensionRem(token.value),
});

const sd = StyleDictionary.extend({
  source: ['output-short.json'],
  platforms: {
    js: {
      transformGroup: 'tokens-studio',
      buildPath: 'build/js/',
      files: [
        {
          destination: 'variables.js',
          format: 'javascript/es6',
        },
      ],
    },
    css: {
      transforms: [
        'attribute/cti', //mine
        'attribute/color', //mine
        // 'ts/descriptionToComment',
        // 'ts/resolveMath',
        'ts/size/rem',
        // 'size/rem', // mine
        // 'ts/size/letterspacing',
        // 'ts/size/lineheight',
        // 'ts/type/fontWeight',
        'color/rgb', // mine
        // 'ts/color/modifiers',
        // 'ts/typography/css/shorthand',
        // 'ts/shadow/shorthand',
        'name/cti/kebab',
      ],
      buildPath: 'build/css/',
      files: [
        {
          destination: 'variables.css',
          format: 'css/variables',
        },
      ],
    },
  },
});

sd.cleanAllPlatforms();
sd.buildAllPlatforms();