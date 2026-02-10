const nextJest = require("next/jest");
const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  testMatch: ["**/?(*.)+(test).[jt]s?(x)"],
};

module.exports = createJestConfig(customJestConfig);
