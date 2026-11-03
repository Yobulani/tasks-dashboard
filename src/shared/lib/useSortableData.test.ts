import { act, renderHook } from '@testing-library/react'
import { useSortableData } from './useSortableData'

interface TestUser {
	id: string
	name: string
	role: string
}

// Фабрика: каждый тест получает свежий массив с исходным порядком
const getUsers = (): TestUser[] => [
	{ id: 'user-1', name: 'Carol', role: 'user' },
	{ id: 'user-2', name: 'Alice', role: 'admin' },
	{ id: 'user-3', name: 'Bob', role: 'user' }
]

describe('useSortableData', () => {
	test('сортирует по одному ключу по возрастанию', () => {
		const { result } = renderHook(() => useSortableData(getUsers(), 'name'))

		expect(result.current.sortKey).toBe('name')
		expect(result.current.direction).toBe('asc')
		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-2',
			'user-3',
			'user-1'
		])
	})

	test('не мутирует исходный массив', () => {
		const items = getUsers()
		const { result } = renderHook(() => useSortableData(items, 'name'))

		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-2',
			'user-3',
			'user-1'
		])
		expect(items.map(user => user.id)).toEqual(['user-1', 'user-2', 'user-3'])
	})

	test('меняет направление при повторном toggleSort по тому же ключу', () => {
		const { result } = renderHook(() => useSortableData(getUsers(), 'name'))

		act(() => result.current.toggleSort('name'))

		expect(result.current.sortKey).toBe('name')
		expect(result.current.direction).toBe('desc')
		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-1',
			'user-3',
			'user-2'
		])

		act(() => result.current.toggleSort('name'))

		expect(result.current.direction).toBe('asc')
		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-2',
			'user-3',
			'user-1'
		])
	})

	test('при смене ключа сортирует по новому ключу и сбрасывает направление', () => {
		const { result } = renderHook(() => useSortableData(getUsers(), 'name'))

		act(() => result.current.toggleSort('name'))
		// направление теперь 'desc'
		act(() => result.current.toggleSort('role'))

		expect(result.current.sortKey).toBe('role')
		expect(result.current.direction).toBe('asc')
		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-2',
			'user-1',
			'user-3'
		])
	})

	test('сохраняет стабильный порядок при равных значениях ключа', () => {
		const { result } = renderHook(() => useSortableData(getUsers(), 'role'))

		// user-1 и user-3 оба 'user': их исходный относительный порядок сохраняется
		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-2',
			'user-1',
			'user-3'
		])
	})

	test('возвращает пустой массив, если items не переданы', () => {
		const withKey = renderHook(() => useSortableData(undefined, 'name'))
		const withoutKey = renderHook(() => useSortableData(undefined, null))

		expect(withKey.result.current.sortedItems).toEqual([])
		expect(withoutKey.result.current.sortedItems).toEqual([])
	})

	test('без ключа возвращает исходный порядок и ту же ссылку на массив', () => {
		const items = getUsers()
		const { result } = renderHook(() => useSortableData(items, null))

		expect(result.current.sortKey).toBeNull()
		expect(result.current.direction).toBe('asc')
		expect(result.current.sortedItems).toBe(items)
		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-1',
			'user-2',
			'user-3'
		])
	})

	test('первый toggleSort после null-ключа включает сортировку по возрастанию', () => {
		const { result } = renderHook(() => useSortableData(getUsers(), null))

		act(() => result.current.toggleSort('name'))

		expect(result.current.sortKey).toBe('name')
		expect(result.current.direction).toBe('asc')
		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-2',
			'user-3',
			'user-1'
		])
	})

	test('пересортировывает при изменении items через rerender', () => {
		const items = getUsers()
		const initialProps: {
			items: TestUser[] | undefined
			sortKey: keyof TestUser | null
		} = { items, sortKey: 'name' }

		const { result, rerender } = renderHook(
			({
				items,
				sortKey
			}: {
				items: TestUser[] | undefined
				sortKey: keyof TestUser | null
			}) => useSortableData(items, sortKey),
			{ initialProps }
		)

		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-2',
			'user-3',
			'user-1'
		])

		rerender({
			items: [...items, { id: 'user-0', name: 'Aaron', role: 'user' }],
			sortKey: 'name'
		})

		expect(result.current.sortedItems.map(user => user.id)).toEqual([
			'user-0',
			'user-2',
			'user-3',
			'user-1'
		])
	})
})
