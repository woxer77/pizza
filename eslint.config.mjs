import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

import eslintConfigPrettier from 'eslint-config-prettier';
import eslintImport from 'eslint-plugin-import';
import prettierConfig from 'eslint-config-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  {
    ignores: ['dist', 'node_modules', '.next']
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      import: eslintImport
    },
    rules: {
      ...prettierConfig.rules,
      'no-var': 'error',
      semi: 'error',
      'no-multi-spaces': 'error',
      'space-in-parens': 'error',
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'prefer-const': 'error',
      'no-use-before-define': 'off',
      quotes: ['error', 'single'],
      indent: ['error', 2],
      'react/jsx-one-expression-per-line': 'off',
      'linebreak-style': ['off', 'windows'],
      'comma-dangle': [
        'error',
        {
          imports: 'never'
        }
      ],
      'react/jsx-props-no-spreading': 'off',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/prefer-default-export': 'off',
      camelcase: 'warn',
      'react/no-array-index-key': 'warn',
      eqeqeq: 'warn',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'no-param-reassign': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@prisma/client',
              importNames: ['Product', 'Ingredient', 'Size', 'DoughType', 'Cart', 'CartItem', 'Order'],
              message: 'Use type from @/types (not Prisma type bc of Decimal)'
            }
          ]
        }
      ],
      '@typescript-eslint/ban-ts-comment': 'off'
    }
  },
  eslintConfigPrettier
];

export default eslintConfig;
