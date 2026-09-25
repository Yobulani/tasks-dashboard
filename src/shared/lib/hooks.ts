import type { AppDispatch, RootState } from '@/store/store'
import { useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
	useSelector(selector)

export const useSortableData = <T>(
	items: T[] | undefined,
	initialSortKey: keyof T | null
) => {
	const [sortKey, setSortKey] = useState(initialSortKey)
	const [direction, setDirection] = useState<'asc' | 'desc'>('asc')

	const sortedItems = useMemo(() => {
		if (!items) {
			return []
		}

		if (!sortKey) {
			return items
		}

		return [...items].sort((i1, i2) => {
			const diff = String(i1[sortKey]).localeCompare(String(i2[sortKey]))

			return direction === 'asc' ? diff : -diff
		})
	}, [sortKey, direction, items])

	const toggleSort = (key: keyof T) => {
		if (key === sortKey) {
			setDirection(sortOrder => (sortOrder === 'asc' ? 'desc' : 'asc'))
		} else {
			setDirection('asc')
			setSortKey(key)
		}
	}

	return { toggleSort, sortedItems, direction, sortKey }
}
