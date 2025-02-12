module.exports = {
  testMatch: ["<rootDir>/(src|example)/**/*.(spec|test).ts?(x)"],
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    ["^(\\.\\.?\\/.+)\\.jsx?$"]: "$1"
  }
}

// const config = {
//   testMatch: ["<rootDir>/src/**/*.(spec|test).ts?(x)"],
//   preset: "ts-jest/presets/js-with-babel",
//   testEnvironment: "node",
//   watchPathIgnorePatterns: [],
//   collectCoverageFrom: ["<rootDir>/src/**"],
//   transform: {
//     "^.+\\.tsx?$": [
//       "ts-jest",
//       { useESM: true, diagnostics: { ignoreCodes: ["TS151001"] } }
//     ]
//   },
//   moduleNameMapper: { "^(\\.\\.?\\/.+)\\.jsx?$": "$1" }
// }
//
//
// const bableConfig = {
//   presets: [["@babel/preset-env", { targets: { node: "current" } }]]
// }
