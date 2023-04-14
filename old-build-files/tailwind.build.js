const StyleDictionaryModule = require('style-dictionary')
const { makeSdTailwindConfig } = require('sd-tailwindcss-transformer')

const sdConfig = makeSdTailwindConfig({
  type: 'all',
  isVariables: true,
  source: ['output-poc.json'],
  // transforms: ['attribute/cti',  'color/rgb', 'size/rem', 'name/cti/kebab',],
})

sdConfig.platforms['css'] = {
  transformGroup: 'css',
  buildPath: './styles/',
  files: [
    {
      destination: 'tailwind.css',
      format: 'css/variables',
      options: {
        outputReferences: true
      }
    }
  ]
}

const StyleDictionary = StyleDictionaryModule.extend(sdConfig)
StyleDictionary.buildAllPlatforms()