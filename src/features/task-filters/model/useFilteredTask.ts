import type { Task } from '@/entities/task'
import type { TaskPriority, TaskStatus } from '@/shared/constants/task'
import { useMemo } from 'react'

export interface TaskFiltersState {
	search: string
	status: TaskStatus | ''
	priority: TaskPriority | ''
}

export const useFilteredTasks = (
	tasks: Task[] | undefined,
	{ search, status, priority }: TaskFiltersState
) => {
	return useMemo(() => {
		if (!tasks) {
			return []
		}

		return tasks?.filter(task => {
			const matchesSearch = task.title
				.toLowerCase()
				.includes(search.toLowerCase())
			const matchesStatus = !status || task.status === status
			const matchesPriority = !priority || task.priority === priority

			return matchesPriority && matchesSearch && matchesStatus
		})
	}, [tasks, priority, search, status])
}
