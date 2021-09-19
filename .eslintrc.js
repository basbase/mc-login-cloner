module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': 'off',
  },
};
