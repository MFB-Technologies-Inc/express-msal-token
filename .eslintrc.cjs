require("@rushstack/eslint-config/patch/modern-module-resolution")

module.exports = {
  extends: ["@rushstack/eslint-config/profile/node"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: "latest",
    sourceType: "module"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "@typescript-eslint/consistent-type-definitions": [1, "type"],
        "@typescript-eslint/naming-convention": [
          "error",
          {
            selector: "parameter",
            format: ["camelCase"],
            leadingUnderscore: "allow"
          }
        ],
        // allow use of null
        "@rushstack/no-new-null": 0,
        // disable requiring explicit types in locations where inference is possible
        "@typescript-eslint/typedef": 0,
        "@rushstack/typedef-var": 0,
        // disable required jest hoisting to allow more flexibility
        "@rushstack/hoist-jest-mock": 0,
        "@typescript-eslint/method-signature-style": ["warn", "property"]
      }
    }
  ]
}
