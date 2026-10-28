import type { Task } from '@/entities/task'
import type { TaskPriority, TaskStatus } from '@/shared/constants/task'
import { useMemo } from 'react'

export interface TaskFiltersState {
	search: string
	status: TaskStatus | ''
	priority: TaskPriority | ''
	onlyMyTasks: boolean
}

export const useFilteredTasks = (
	tasks: Task[] | undefined,
	{ search, status, priority, onlyMyTasks }: TaskFiltersState,
	currentUserId?: string
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
			const isAssigned = !onlyMyTasks || task.assigneeId === currentUserId

			console.log(isAssigned)

			return matchesPriority && matchesSearch && matchesStatus && isAssigned
		})
	}, [tasks, priority, search, status, onlyMyTasks])
}
