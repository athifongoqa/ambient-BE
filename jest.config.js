/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testEnvironment: 'node',
    testMatch: ["**/**/*.test.js"],
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
  };