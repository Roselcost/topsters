const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        tsconfig: {
          jsx: "react",
        },
      },
    ],
  },
  moduleNameMapper: {
    "\\.module\\.css$": "<rootDir>/__mocks__/cssMock.js",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
};