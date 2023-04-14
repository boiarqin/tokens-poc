const path = require('path');
const StyleDictionary = require('style-dictionary');
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
  StyleDictionary.registerTransform({
    name: 'comment/figma',
    type: 'attribute',
    // matcher: function(token) {
    //   return token.attributes.category === 'color';
    // },
    transformer: function(token) {
        const _t = token;
        _t.comment = token.path.join("/");
        return _t;
    }
  });

StyleDictionary.registerTransform({
    name: 'time/seconds',
    type: 'value',
    matcher: function(token) {
      return token.attributes.category === 'color';
    },
    transformer: function(token) {
        console.log(token)
    //   return (parseInt(token.original.value) / 1000).toString() + 's';
    return token.original.value
    }
  });

const sd = StyleDictionary.extend({
    // source: ['alle/**/*.json', '!alle/CRM.json'],
    source: ['alle/Ref.json', 'alle/Alle.json'],
    platforms: {
        css: {
            transforms: ['comment/figma', 'attribute/cti','name/figma',  'time/seconds'],
            buildPath: 'build/css/',
            files: [
                {
                destination: 'chakra.css',
                format: 'css/variables',
                    "options": {
                    // Look here 👇
                    "outputReferences": true,
                    "commentStyle": 'short'
                  }
                },
            ]
        },
        js: {
        // transformGroup: 'tokens-studio',
        // parsers: []
        transforms: ['comment/figma', 'attribute/cti','name/figma',  'time/seconds'],
        buildPath: 'build/js/',
        files: [
            {
            destination: 'debug.js',
            format: 'javascript/object',
            "options": {
                // Look here 👇
                "outputReferences": true,
                "commentStyle": 'short'
              }
            },
        ],
    }
}
});



sd.buildAllPlatforms();