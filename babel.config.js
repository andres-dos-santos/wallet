module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@components': './components',
            '@app': './app',
            '@styles': './styles',
            '@utils': './utils',
            '@data': './data',
            '@icons': './icons',
          },
        },
      ],
    ],
  }
}
