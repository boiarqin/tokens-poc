const path = require('path');
const StyleDictionary = require('style-dictionary');
const { globSync} = require('glob');
const jsdom = require("jsdom");

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
// to extract the path from the icon (assuming it is created correctly)
// Note: CheckboxEnabled is an example element that needs to be exported differently
  StyleDictionary.registerTransform({
    name: 'attribute/svg-path',
    type: 'attribute',
    transformer: function(token) {
        const _t = token;
        const dom = new jsdom.JSDOM(token.value, "image/svg+xml");
        const svgPath = dom.window.document.querySelector('path')?.getAttribute('d')
        _t.svgPath = svgPath
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
`import { createIcon } from "@chakra-ui/icon"

export const ${token.iconName}Icon = createIcon({
    d: "${token.svgPath}",
    displayName: "${token.iconName}Icon",
})`
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
            transforms: ['attribute/icon-name', 'attribute/svg-path'],
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
