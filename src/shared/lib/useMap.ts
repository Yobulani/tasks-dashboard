import { useMemo } from 'react'

export const useMap = <T, K extends keyof T>(
	items: T[] | undefined,
	key: K
): Map<T[K], T> => {
	return useMemo(() => {
		const map = new Map<T[K], T>()

		items?.forEach(item => map.set(item[key], item))

		return map
	}, [items, key])
}
