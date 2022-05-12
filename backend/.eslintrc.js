module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
  },
  plugins: ["react"],
  rules: {
    "comma-dangle": "off",
    "linebreak-style": 0,
    "global-require": 0,
    "eslint linebreak-style": [0, "error", "windows"],
    quotes: ["error", "double", { allowTemplateLiterals: true }],
    "react/react-in-jsx-scope": "off",
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
  },
};
