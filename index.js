const StyleDictionary = require('style-dictionary').extend({
  source: ['tokens/*.json'],
  platforms: {
    less: {
      transformGroup: ['less'],
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

// First, register a new transform
StyleDictionary.registerTransform({
  name: 'size/px',
  type: 'value',
  // transitive: true, // use this property to transform referenced values.
  // If matcher is omitted, all tokens are matched.
  matcher: (token) => {
    return token.type === 'dimension' && token.value !== 0
  },
  transformer: (token) => {
    // token.value will be resolved and transformed at this point
    return `${token.value}px`
  },
})

// Then add the transform to transformGroup
StyleDictionary.registerTransformGroup({
  name: 'less', // name of transformGroup in config
  transforms: StyleDictionary.transformGroup['less'].concat(['size/px']),
})

StyleDictionary.buildAllPlatforms()
