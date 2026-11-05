import fsd from '@feature-sliced/steiger-plugin'
import { defineConfig } from 'steiger'

export default defineConfig([
	...fsd.configs.recommended,
	{
		rules: {
			'fsd/forbidden-imports': 'off',
			'fsd/no-cross-imports': 'error',
			'fsd/no-higher-level-imports': 'error'
		}
	},
	{
		files: ['src/**/model/**'],
		rules: {
			'fsd/no-higher-level-imports': 'off'
		}
	},
	{
		files: ['src/shared/lib/hooks.ts'],
		rules: {
			'fsd/no-higher-level-imports': 'off'
		}
	},
	{
		files: ['./src/app/**'],
		rules: {
			'fsd/segments-by-purpose': 'off',
			'fsd/no-public-api-sidestep': 'off'
		}
	}
])
