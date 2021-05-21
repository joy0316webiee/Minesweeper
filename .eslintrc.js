module.exports = {
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".d.ts",
          ".json"
        ]
      }
    }
  },
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": [
    "eslint-config-airbnb",
    "plugin:@typescript-eslint/recommended"
  ],
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "eslint-plugin-react",
    "@typescript-eslint/eslint-plugin"
  ],
  "rules": {
    "no-console": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "@typescript-eslint/camelcase": "off",
    "radix": "off",
    "no-empty": "off",
    "no-restricted-syntax": "off",
    "indent": "off",
    "no-param-reassign": "off",
    "@typescript-eslint/indent": [
      "error",
      2
    ],
    "jsx-quotes": [
      "error",
      "prefer-single"
    ],
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx",
          ".tsx"
        ]
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        "allowExpressions": true,
        "allowTypedFunctionExpressions": true
      }
    ],
    "@typescript-eslint/no-empty-interface": "off",
    "react/prop-types": "off",
    "react-hooks/exhaustive-deps": "off"
  },
  "overrides": {
    "files": [
      "**/*.ts",
      "**/*.tsx"
    ],
    "parser": "@typescript-eslint/parser",
    "rules": {
      "no-undef": "off",
      "react-hooks/exhaustive-deps": "off"
    }
  }
}
