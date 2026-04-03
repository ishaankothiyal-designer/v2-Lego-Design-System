import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['src/tokens.json'],
  platforms: {
    // Web — CSS custom properties
    css: {
      transformGroup: 'css',
      prefix: 'lego',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    // Web — JS/TS named exports
    js: {
      transformGroup: 'js',
      buildPath: 'dist/',
      files: [
        {
          destination: 'index.mjs',
          format: 'javascript/es6',
        },
        {
          destination: 'index.js',
          format: 'javascript/module-flat',
        },
        {
          destination: 'index.d.ts',
          format: 'typescript/es6-declarations',
        },
      ],
    },
    // React Native — JS object
    native: {
      transformGroup: 'react-native',
      buildPath: 'dist/',
      files: [
        {
          destination: 'tokens.native.js',
          format: 'javascript/es6',
        },
      ],
    },
  },
});

await sd.buildAllPlatforms();
