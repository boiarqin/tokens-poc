const path = require('path');
const StyleDictionary = require('style-dictionary');
const { globSync} = require('glob');

// Read in the SVG file
StyleDictionary.registerParser({
    pattern: /\.svg$/,
    parse: ({ filePath, contents }) => {
        const fileName = path.basename(filePath).split('.')[0]
        return {
            [fileName]: {
                value: contents
            }
        }
    }
});

// Add attributes to the token
// Could parse the svg and pull out specific parts, like path
// assuming all svgs are exported correctly
StyleDictionary.registerTransform({
    name: 'attribute/icon-name',
    type: 'attribute',
    transformer: function(token) {
        const _t = token;
        _t.iconName = path.basename(token.filePath).split('.')[0]
        return _t;
    }
  });

// custom formatter
// to transform the icon to a react component
  StyleDictionary.registerFormat({
    name: 'icon/custom',
    formatter: function({dictionary, platform, options, file}) {
        return dictionary.allTokens.map(token => {
            return (
`import React from 'react';

export const ${token.iconName}Icon = () => {
    <div> 
        ${token.value}
    </div>
};`
            )
      }).join(`\n`)
  }})

// need to map over icon files like this in order to generate separate file per icon
const iconFiles = globSync('assets/*.svg');
iconFiles.map((iconFile) => {
    const fileName = path.basename(iconFile).split('.')[0]
    const sd = StyleDictionary.extend({
        source: [iconFile],
        platforms: {
          // icons/jsx is arbitrary name
          'icons/jsx': {
            transforms: ['attribute/icon-name'],
            buildPath: 'build/icons/',
            files: [
              {
                  destination: `${fileName}.jsx`,
                  format: 'icon/custom',
              },
            ]
          }  
        }
      })
    
      sd.buildAllPlatforms();
}

)
