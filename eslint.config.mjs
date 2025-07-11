import { dirname } from "path"
import { fileURLToPath } from "url"

import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname
})

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends("prettier"),
  {
    plugins: {
      import: (await import("eslint-plugin-import")).default,
      "@typescript-eslint": (await import("@typescript-eslint/eslint-plugin"))
        .default,
      prettier: (await import("eslint-plugin-prettier")).default
    },
    rules: {
      // Prettier integration
      "prettier/prettier": ["error", { semi: false, trailingComma: "none" }],

      // Import rules
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index"
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          }
        }
      ],
      "import/no-unresolved": "error",
      "import/no-duplicates": "error",

      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_"
        }
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-var-requires": "error",

      // React rules
      "react/jsx-uses-react": "off", // Not needed in React 17+
      "react/react-in-jsx-scope": "off", // Not needed in React 17+
      "react/prop-types": "off", // Using TypeScript instead
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-undef": "error",
      "react/no-array-index-key": "warn",
      "react/no-unescaped-entities": "error",

      // General code quality
      "no-console": "off",
      "no-debugger": "error",
      "no-alert": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "no-unused-expressions": "error",
      "no-duplicate-imports": "error",
      "no-multiple-empty-lines": ["error", { max: 2 }],
      "eol-last": "error",
      "no-trailing-spaces": "error",
      "comma-dangle": ["error", "never"],
      semi: ["error", "never"],
      quotes: ["error", "double", { avoidEscape: true }],
      indent: ["error", 2],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "comma-spacing": ["error", { before: false, after: true }],
      "key-spacing": ["error", { beforeColon: false, afterColon: true }],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-before-blocks": "error",
      "space-before-function-paren": ["error", "always"],
      "space-in-parens": ["error", "never"],
      "space-infix-ops": "error",
      "arrow-spacing": "error",
      "template-curly-spacing": ["error", "never"],
      "no-multi-spaces": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-tabs": "error"
    }
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  }
]

export default eslintConfig
