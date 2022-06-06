module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["no-only-tests", "@typescript-eslint"],
  rules: {
    "prettier/prettier": ["error"],
    "jsx-quotes": ["error", "prefer-double"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-var-requires": 0,
  },
  overrides: [
    {
      files: ["src/fixtures/**/*.ts", "**/*.cafe.ts", "**/*.po.ts"],
      parserOptions: {
        project: {
          extends: "../../e2e/tsconfig.e2e.json",
        },
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off",
        "no-only-tests/no-only-tests": "error",
      },
    },
  ],
};
