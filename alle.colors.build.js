const path = require('path');
const StyleDictionary = require('style-dictionary');
const {minifyDictionary} = StyleDictionary.formatHelpers;
// const { registerTransforms } = require('@tokens-studio/sd-transforms');
// registerTransforms(StyleDictionary);

// StyleDictionary.registerParser({
//     pattern: /\.json$/,
//     parse: ({ filePath, contents }) => {
//         // grab the filename to use as top level key
//         const filename = path.basename(filePath).replace('.json', '')

//       return {[filename]: JSON.parse(contents)};
//     }
//   });

// StyleDictionary.registerTransform({
//     name: 'category/rename',
//     transformer: function(token) {
//         if token.
//     }

// });

StyleDictionary.registerTransform({
    name: 'name/figma',
    type: 'name',
    // matcher: function(token) {
    //   return token.attributes.category === 'color';
    // },
    transformer: function(token) {
        return token.path.join("-").toLowerCase();
    }
  });

  // create a comment that lets us map the final value back to figma name
  StyleDictionary.registerTransform({
    name: 'comment/figma',
    type: 'attribute',
    transformer: function(token) {
        const _t = token;
        _t.comment = token.path.join("/");
        return _t;
    }
  });

  StyleDictionary.registerFormat({
    name: 'chakra/minify',
    formatter: function({dictionary, platform, options, file}) {
        // clean up unused attributes
        return JSON.stringify(minifyDictionary(dictionary.tokens));

        // return JSON.stringify(dictionary.tokens, null, 2);
      }
  })

  StyleDictionary.registerFormat({
    name: 'chakra/with-comments',
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
            return `Token Name:${token.name} | Original reference name: ${value};`
          }).join(`\n`)
      }
  })


  

const sd = StyleDictionary.extend({
    // source: ['alle/**/*.json', '!alle/CRM.json'],
    source: ['alle/ref-colors.json', 'alle/sem-colors.json'],
    platforms: {
        js: {
        // transformGroup: 'tokens-studio',
        // parsers: []
        transforms: ['comment/figma', 'attribute/cti','name/figma',  'time/seconds'],
        buildPath: 'build/js/',
        files: [
            {
            destination: 'colors.debug.js',
            format: 'javascript/object',
            "options": {
                // Look here 👇
                "outputReferences": true,
                "commentStyle": 'short'
              }
            },
            {
                destination: 'colors.minify.json',
                format: 'chakra/minify'
            },
            {
                destination: 'colors.with-comments.js',
                format: 'chakra/with-comments'
            }
        ],
    }
}
});



sd.buildAllPlatforms();