const { pathsToModuleNameMapper } = require("ts-jest");
const { paths } = require("./tsconfig.json").compilerOptions;

process.env.TZ = "UTC";

// eslint-disable-next-line no-undef
globalThis.ngJest = {
  skipNgcc: false,
  tsconfig: "tsconfig.spec.json",
};

/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/node_modules/jest-preset-angular/setup-jest"],
  modulePaths: ["<rootDir>"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/culori/dist/.+"],
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
  coverageReporters: [["lcov", { projectRoot: "../.." }], "html"],
};
