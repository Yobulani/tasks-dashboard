import type { Task } from '@/entities/task'
import { useMemo } from 'react'

export const useProjectStats = (
	tasks: Task[] | undefined,
	projectId: string
): { total: number; done: number; progress: number } => {
	return useMemo(() => {
		if (!tasks) {
			return { total: 0, done: 0, progress: 0 }
		}

		const projectTasks = tasks.filter(task => task.projectId === projectId)

		const total = projectTasks.length
		const done = projectTasks.filter(task => task.status === 'done').length
		const progress =
			projectTasks.length === 0 ? 0 : Math.round((done / total) * 100)

		return { total, done, progress }
	}, [tasks, projectId])
}
