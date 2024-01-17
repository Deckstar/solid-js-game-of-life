/* eslint-env node */

/** @type {import("eslint").Linter.Config} */
const eslintConfig = {
  extends: ["prettier"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
  rules: {
    "@typescript-eslint/adjacent-overload-signatures": "error",
    "@typescript-eslint/no-shadow": ["error", { hoist: "functions" }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-console": "warn",
    "no-unreachable": "error",
    "prettier/prettier": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};

module.exports = eslintConfig;
