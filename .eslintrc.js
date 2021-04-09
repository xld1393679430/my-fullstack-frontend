module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-trailing-spaces': 'error',
    'object-curly-spacing': [
      'error', 'always',
    ],
    'react/prop-types': 'off',
    'no-return-await': 'off',
    'no-console': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'react/button-has-type': 'off',
    'react/destructuring-assignment': 'off',
  },
};
