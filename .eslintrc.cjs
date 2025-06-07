module.exports = {
  extends: ['plugin:@typescript-eslint/recommended', 'next/core-web-vitals', 'prettier'],
  plugins: ['@typescript-eslint'],
  rules: {
    'prefer-const': 'error',
    'no-unused-vars': 'error',

    'no-empty-pattern': 'error',

    'react/jsx-curly-brace-presence': ['warn', { props: 'never', children: 'never' }],
  },
};
