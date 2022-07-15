/**
 * Copyright 2004-present Facebook. All Rights Reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

module.exports = {
  collectCoverageFrom: [
    '**/fbcnms-projects/**/*.js',
    '**/fbcnms-packages/**/*.js',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/fbcnms-packages/fbcnms-ui/stories/**',
    '!**/thrift/gen-nodejs/**',
    '!**/node_modules/**',
    '!**/fbcnms-packages/fbcnms-test/**',
  ],

  coverageReporters: ['json', 'html'],
  modulePathIgnorePatterns: [],
  projects: [
    {
      name: 'server',
      testEnvironment: 'node',
      testMatch: [
        //'<rootDir>/__tests__/*.js',
        '<rootDir>/fbcnms-projects/**/server/**/__tests__/*.js',
        '<rootDir>/fbcnms-projects/platform-server/**/__tests__/*.js',
        // run app/server shared tests in both node and jsdom environments
        '<rootDir>/fbcnms-projects/**/shared/**/__tests__/*.js',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
      transformIgnorePatterns: ['/node_modules/(?!@fbcnms)'],
    },
    {
      moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
          '<rootDir>/__mocks__/fileMock.js',
        '\\.(css|less)$': 'identity-obj-proxy',
      },
      name: 'app',
      setupFiles: [require.resolve('@fbcnms/babel-register/polyfill')],
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/fbcnms-projects/**/app/components/__tests__/*.js',
        '<rootDir>/fbcnms-projects/**/app/components/configuration_management/__tests__/*.js',
        '<rootDir>/fbcnms-projects/**/app/components/configure/__tests__/*.js',
      ],
      transform: {
        '^.+\\.js$': 'babel-jest',
      },
      transformIgnorePatterns: ['/node_modules/(?!@fbcnms)'],
    },
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/'],
};
