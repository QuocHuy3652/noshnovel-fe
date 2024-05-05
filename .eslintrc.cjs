module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "eslint-config-prettier"
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs','vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  settings: {
    "react": {
      "version": "detect"
    },
    "import/resolver": {
      typescript: {},
      project: "./tsconfig.json",
      alias: {
        map: [
          ['', './public']  // <-- this line
        ],
        extensions: ['.js', '.jsx',".ts",".tsx"]
      },
      "node": {
        "paths": [
          "src",
        ],
        "extensions": [
          ".js",
          ".jsx",
          ".ts",
          ".tsx"
        ]
      }
    }
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // 'no-unused-vars': [
    //   "error",
    //   {
    //     "vars": "all",
    //     "args": "after-used",
    //     "ignoreRestSiblings": true,
    //     "argsIgnorePattern": "^_"
    //   }
    // ],
    "no-unused-vars": "off",
    'react/react-in-jsx-scope': "off",
    'jsx-a11y/label-has-associated-control': 'off',
    'react/no-unknown-property': 'off',
    "@typescript-eslint/no-unused-vars": 'off',
    "jsx-a11y/anchor-is-valid": "off",
    "@typescript-eslint/no-var-requires": "off",
    "no-undef": "off",
    "react/no-children-prop": "off",
  },
}