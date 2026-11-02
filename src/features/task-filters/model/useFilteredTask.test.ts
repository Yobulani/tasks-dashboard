import type { Task } from '@/entities/task'
import { renderHook } from '@testing-library/react'
import { useFilteredTasks, type TaskFiltersState } from './useFilteredTask'

const emptyFilters: TaskFiltersState = {
	search: '',
	status: '',
	priority: '',
	assigneeId: null,
	projectId: null
}

const tasks: Task[] = [
	{
		id: 'task-1',
		title: 'Fix login bug',
		description: 'Login fails on Safari',
		status: 'todo',
		priority: 'high',
		assigneeId: 'user-1',
		projectId: 'project-1',
		createdAt: '2026-01-12T10:00:00.000Z'
	},
	{
		id: 'task-2',
		title: 'Design landing page',
		description: 'New marketing layout',
		status: 'in-progress',
		priority: 'medium',
		assigneeId: 'user-2',
		projectId: 'project-2',
		createdAt: '2026-01-13T10:00:00.000Z'
	},
	{
		id: 'task-3',
		title: 'Write API documentation',
		description: 'Document public endpoints',
		status: 'done',
		priority: 'low',
		assigneeId: 'user-1',
		projectId: 'project-1',
		createdAt: '2026-01-14T10:00:00.000Z'
	}
]

describe('useFilteredTasks', () => {
	test('пустые фильтры возвращают все задачи', () => {
		const { result } = renderHook(() => useFilteredTasks(tasks, emptyFilters))

		expect(result.current).toEqual(tasks)
	})

	test('поиск фильтрует задачи по названию без учёта регистра', () => {
		const { result, rerender } = renderHook<Task[], TaskFiltersState>(
			({ search }) => useFilteredTasks(tasks, { ...emptyFilters, search }),
			{ initialProps: { ...emptyFilters, search: '' } }
		)

		expect(result.current).toHaveLength(3)

		rerender({ ...emptyFilters, search: 'login' })
		expect(result.current.map(task => task.id)).toEqual(['task-1'])

		rerender({ ...emptyFilters, search: 'API' })
		expect(result.current.map(task => task.id)).toEqual(['task-3'])

		rerender({ ...emptyFilters, search: 'нет совпадений' })
		expect(result.current).toEqual([])
	})

	test('фильтр по assigneeId возвращает задачи только выбранного исполнителя', () => {
		const { result, rerender } = renderHook<Task[], TaskFiltersState>(
			({ assigneeId }) => useFilteredTasks(tasks, { ...emptyFilters, assigneeId }),
			{ initialProps: { ...emptyFilters, assigneeId: 'user-1' } }
		)

		expect(result.current.map(task => task.id)).toEqual(['task-1', 'task-3'])

		rerender({ ...emptyFilters, assigneeId: 'user-2' })
		expect(result.current.map(task => task.id)).toEqual(['task-2'])

		rerender({ ...emptyFilters, assigneeId: null })
		expect(result.current).toEqual(tasks)
	})

	test('фильтр по status возвращает задачи только выбранного статуса', () => {
		const { result, rerender } = renderHook<Task[], TaskFiltersState>(
			({ status }) => useFilteredTasks(tasks, { ...emptyFilters, status }),
			{ initialProps: { ...emptyFilters, status: 'todo' } }
		)

		expect(result.current.map(task => task.id)).toEqual(['task-1'])

		rerender({ ...emptyFilters, status: 'in-progress' })
		expect(result.current.map(task => task.id)).toEqual(['task-2'])

		rerender({ ...emptyFilters, status: 'done' })
		expect(result.current.map(task => task.id)).toEqual(['task-3'])

		rerender({ ...emptyFilters, status: '' })
		expect(result.current).toEqual(tasks)
	})

	test('фильтр по priority возвращает задачи только выбранного приоритета', () => {
		const { result, rerender } = renderHook<Task[], TaskFiltersState>(
			({ priority }) => useFilteredTasks(tasks, { ...emptyFilters, priority }),
			{ initialProps: { ...emptyFilters, priority: 'high' } }
		)

		expect(result.current.map(task => task.id)).toEqual(['task-1'])

		rerender({ ...emptyFilters, priority: 'medium' })
		expect(result.current.map(task => task.id)).toEqual(['task-2'])

		rerender({ ...emptyFilters, priority: 'low' })
		expect(result.current.map(task => task.id)).toEqual(['task-3'])

		rerender({ ...emptyFilters, priority: '' })
		expect(result.current).toEqual(tasks)
	})

	test('возвращает пустой массив, пока задачи не загружены', () => {
		const { result } = renderHook(() => useFilteredTasks(undefined, emptyFilters))

		expect(result.current).toEqual([])
	})
})
