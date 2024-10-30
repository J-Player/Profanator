import pluginJs from '@eslint/js'
import pluginReact from 'eslint-plugin-react'
import eslintPluginTailwindCSS from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
	{ files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	pluginReact.configs.flat?.recommended,
	...eslintPluginTailwindCSS.configs['flat/recommended'],
	eslintConfigPrettier,
	{
		rules: {
			'react/no-unescaped-entities': 'off',
			'react/jsx-uses-react': 'off',
			'react/react-in-jsx-scope': 'off'
		}
	}
]
