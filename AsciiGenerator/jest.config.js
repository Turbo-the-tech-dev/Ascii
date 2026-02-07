module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation|figlet)',
  ],
  moduleNameMapper: {
    '^figlet$': '<rootDir>/node_modules/figlet',
  },
};
