/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {

  testEnvironment: "node",
  preset: 'ts-jest',
  transform: {
    "^.+.tsx?$": ["ts-jest",{}],
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transformIgnorePatterns: ['/node_modules/'],
};