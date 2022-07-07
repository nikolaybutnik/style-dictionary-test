const StyleDictionary = require('style-dictionary')

const styleDictionary = StyleDictionary.extend({
  source: ['tokens/*.json'],
  platforms: {
    less: {
      transformGroup: 'less',
      buildPath: 'build/less/',
      files: [
        {
          destination: '_variables.less',
          format: 'less/variables',
        },
      ],
    },
  },
})

// Define custom trnasformations here.

styleDictionary.buildAllPlatforms()
