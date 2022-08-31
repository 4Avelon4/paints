module.exports = {
  transform: {
    '\\.js$': 'babel-jest',
  },
  collectCoverage: true,
  coverageDirectory: 'jest-coverage',
  testEnvironment: 'jsdom',
};
