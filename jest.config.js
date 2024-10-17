/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/example"], // Ignore example folder tests
  testPathIgnorePatterns: ["<rootDir>/node_modules/"], // Ignore node_modules
};
