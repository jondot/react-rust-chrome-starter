module.exports = {
  extends: [
    '@antfu/eslint-config-react',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  ignorePatterns: ['src/components/ui/**'],
  plugins: ['prettier'],
  rules: {
    'antfu/top-level-function': 0,
    curly: ['error', 'all'],
    'arrow-parens': ['error', 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],
    // 'arrow-parens': ["error", "always"],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
      },
    ],
  },
}
