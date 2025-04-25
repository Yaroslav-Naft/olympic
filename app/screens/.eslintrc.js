module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // If using TypeScript
  plugins: [
    '@typescript-eslint',
    'import',
    'unused-imports',
    'promise',
    'jsdoc',
    'sonarjs',
    'security',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // Typescript rules
    'plugin:promise/recommended',
    'plugin:sonarjs/recommended', // Cognitive complexity, bug detection
    'plugin:security/recommended', // Common security mistakes
  ],
  rules: {
    /* General Code Quality */
    'no-console': 'warn',
    'no-debugger': 'error',
    'no-alert': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    eqeqeq: ['error', 'always'],
    curly: 'error',
    'no-else-return': 'error',
    'default-case': 'warn',

    /* Imports */
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      { alphabetize: { order: 'asc' }, groups: [['builtin', 'external', 'internal']] },
    ],
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],

    /* Typescript */
    '@typescript-eslint/no-unused-vars': [
      'warn',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off', // Turn ON if you want everything strongly typed
    '@typescript-eslint/no-explicit-any': 'warn',

    /* Promises */
    'promise/always-return': 'off', // (Optional) Enable if you want strict returns in promises
    'promise/catch-or-return': 'error',
    'promise/no-nesting': 'warn',

    /* Documentation */
    'jsdoc/require-jsdoc': 'off',
    'jsdoc/check-alignment': 'warn',

    /* Best Practices */
    'sonarjs/no-duplicate-string': 'warn',
    'sonarjs/cognitive-complexity': ['warn', 15], // warn when function is too complex
    'sonarjs/no-all-duplicated-branches': 'error',

    /* Security */
    'security/detect-object-injection': 'off', // Turn on for strict apps, but can be noisy

    /* Style */
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    indent: ['error', 2],
    'comma-dangle': ['error', 'always-multiline'],
    'object-curly-spacing': ['error', 'always'],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
};
