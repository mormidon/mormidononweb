module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh"],
  rules: {
    // Existing rules
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    // PropTypes validation rules
    "react/prop-types": "error",
    "react/require-default-props": "warn",
    "react/default-props-match-prop-types": "error",
    "react/no-unused-prop-types": "warn",

    // Simplified prop-types sorting (or disable if problematic)
    "react/sort-prop-types": "off",

    // Additional React best practices
    "react/jsx-pascal-case": "error",
    "react/no-deprecated": "error",
    "react/no-direct-mutation-state": "error",
    "react/no-typos": "error",
    "react/require-render-return": "error",
    "react/self-closing-comp": "warn",
    "react/jsx-boolean-value": "warn",

    // React Hooks rules (enhanced)
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",

    // General JavaScript best practices
    "no-unused-vars": "warn",
    "no-console": "warn",
    "prefer-const": "error",
    "no-var": "error",
    eqeqeq: "error",
    "no-duplicate-imports": "error",
  },
};
