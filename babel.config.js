module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    "nativewind/babel",
    'react-native-reanimated/plugin',
    ["@babel/plugin-proposal-decorators", { "legacy": true }],
  ],
};
