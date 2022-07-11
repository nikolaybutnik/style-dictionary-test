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

StyleDictionary.registerTransform({
  name: 'custom/sizes',
  type: 'name',
  matcher: (token) => token.attributes.category === 'sizes',
  transformer: (token) => {
    const sizeValues = {
      8: 'xxs',
      16: 'xs',
      24: 's',
      32: 'm',
      40: 'l',
      64: 'xl',
      128: 'xxl',
    }
    return `sizes-${sizeValues[token.original.value]}`
  },
})

// Then add the transform to transformGroup
StyleDictionary.registerTransformGroup({
  name: 'less', // name of transformGroup in config
  transforms: StyleDictionary.transformGroup['less'].concat([
    'size/px',
    'custom/sizes',
  ]),
})

StyleDictionary.buildAllPlatforms()
