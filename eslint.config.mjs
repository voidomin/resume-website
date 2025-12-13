// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/**
 * ESLint Flat Config — Professional Setup
 *
 * Responsibilities:
 * - ESLint → correctness, safety, best practices
 * - Prettier → formatting
 *
 * Strategy:
 * - Warnings instead of errors (CI-friendly)
 * - Prettier disables conflicting ESLint rules
 * - Scoped rules for project JS only
 */

export default [
  /* --------------------------------------------------
   * 1. Global ignores (applies everywhere)
   * -------------------------------------------------- */
  {
    ignores: ["node_modules/**", "dist/**", "public/**", "preview/**"],
  },

  /* --------------------------------------------------
   * 2. Base JavaScript recommended rules
   * -------------------------------------------------- */
  js.configs.recommended,

  /* --------------------------------------------------
   * 3. Project-specific JS rules
   * -------------------------------------------------- */
  {
    files: ["assets/js/**/*.js", "assets/js/src/**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      /* Safety & correctness */
      "no-undef": "warn",
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      "no-empty": ["warn", { allowEmptyCatch: false }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      eqeqeq: ["warn", "always"],

      /* Maintainability */
      curly: ["warn", "all"],
    },
  },

  /* --------------------------------------------------
   * 4. Disable ESLint rules that conflict with Prettier
   * -------------------------------------------------- */
  prettierConfig,

  /* --------------------------------------------------
   * 5. Prettier as an ESLint rule (non-blocking)
   * -------------------------------------------------- */
  {
    files: ["**/*.{js,css,html,json,md}"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "warn",
    },
  },
];
