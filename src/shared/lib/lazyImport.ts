import { lazy, type ComponentType } from 'react'

export const lazyImport = <T extends Record<string, ComponentType>, K extends keyof T>(
	factory: () => Promise<T>,
	key: K
) => {
	return lazy(async () => {
		const module = await factory()
		return { default: module[key] }
	})
}
