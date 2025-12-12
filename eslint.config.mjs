import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["assets/js/**/*.js", "assets/js/src/**/*.js"],
    ignores: ["node_modules/**", "dist/**", "preview/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
  js.configs.recommended,
];
