const path = require('path');
const StyleDictionary = require('style-dictionary');

// Style dictionary comes with some OOTB helper functions for parsing, transforming, and formatting
const {minifyDictionary} = StyleDictionary.formatHelpers;

// custom transformer
// create a name more in-line with Chakra usage
StyleDictionary.registerTransform({
    name: 'name/chakra',
    type: 'name',
    // we don't need it here, but matchers can be defined as well
    // matcher: function(token) {
    //   return token.attributes.category === 'color';
    // },
    transformer: function(token) {
        return token.path.join(".").toLowerCase().replaceAll(' ', '');
    }
  });

  // custom transformer
  // create an attribute that lets us map the final value back to Figma name
  StyleDictionary.registerTransform({
    name: 'attribute/figma-name',
    type: 'attribute',
    transformer: function(token) {
        const _t = token;
        _t.figmaName = token.path.join("/");
        return _t;
    }
  });

  // custom formatter
  // cleans up and minifies style dictionary values
  StyleDictionary.registerFormat({
    name: 'chakra/minify',
    formatter: function({dictionary, platform, options, file}) {
        // clean up unused attributes
        return JSON.stringify(minifyDictionary(dictionary.tokens));
      }
  })

  // custom formatter
  // dumps out token names, the original value or alias, and the figma name
  StyleDictionary.registerFormat({
    name: 'chakra/custom',
    formatter: function({dictionary, platform, options, file}) {
        return dictionary.allTokens.map(token => {
            let value = JSON.stringify(token.value);
            // the `dictionary` object now has `usesReference()` and
            // `getReferences()` methods. `usesReference()` will return true if
            // the value has a reference in it. `getReferences()` will return
            // an array of references to the whole tokens so that you can access their
            // names or any other attributes.
            if (dictionary.usesReference(token.original.value)) {
              // Note: make sure to use `token.original.value` because
              // `token.value` is already resolved at this point.
              const refs = dictionary.getReferences(token.original.value);
              refs.forEach(ref => {
                value = value.replace(ref.value, function() {
                  return `${ref.name}`;
                });
              });
            }
            return `Token Name:${token.name} | Original value or alias name: ${value} | Figma name: ${token.figmaName};`
          }).join(`\n`)
      }
  })


  

const sd = StyleDictionary.extend({
    // short example applied to just the color tokens
    source: ['alle/ref-colors.json', 'alle/sem-colors.json'],
    platforms: {
        js: {
        transforms: ['attribute/figma-name', 'name/chakra', 'attribute/cti', 'time/seconds'],
        buildPath: 'build/js/',
        files: [
            // this default formatter outputs the entire style dictionary object
            // which is useful for debugging and traceability
            {
                destination: 'colors.debug.js',
                format: 'javascript/object',
            },
            // this custom formatter outputs code that could be directly consumed in chakra
            {
                destination: 'colors.minify.json',
                format: 'chakra/minify'
            },
            // this customer formatter demonstrates what could be possible
            // but may be redundant with the debug file.
            {
                destination: 'colors.with-comments.js',
                format: 'chakra/custom'
            }
        ],
    }
}
});

sd.buildAllPlatforms();