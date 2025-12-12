// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import prettierPlugin from "eslint-plugin-prettier";

/**
 * Flat config: export an array of config objects.
 * - First block: project-specific rules (assets/js)
 * - Then include the canonical recommended JS config (from @eslint/js)
 * - Then include a small Prettier integration by registering the plugin
 *   and turning on the prettier/prettier rule.
 */

export default [
  {
    files: ["assets/js/**/*.js", "assets/js/src/**/*.js", "assets/js/*.js"],
    ignores: ["node_modules/**", "dist/**", "public/**", "preview/**"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": ["warn", { args: "none", vars: "all", ignoreRestSiblings: true }],
      "no-empty": ["warn", { allowEmptyCatch: false }],
      "no-undef": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "warn",
      eqeqeq: ["warn", "always"],
      curly: ["warn", "all"],
      semi: ["warn", "always"],
      quotes: ["warn", "double", { avoidEscape: true }],
    },
  },

  // include the official JS recommended config (object form — allowed in flat config)
  js.configs.recommended,

  // Prettier plugin integration (flat config style)
  {
    files: ["**/*.{js,css,html,json,md}"],
    ignores: ["node_modules/**", "dist/**"],
    // register the plugin under "prettier"
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // turn on the prettier rule (it uses the plugin we've registered above)
      "prettier/prettier": "warn",
    },
  },
];
