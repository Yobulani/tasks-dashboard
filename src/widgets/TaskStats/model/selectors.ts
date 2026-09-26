import type { Task } from '@/entities/task'
import { createSelector } from '@reduxjs/toolkit'

export const selectTasksByStatus = createSelector(
	[(tasks: Task[]) => tasks],
	tasks => [
		{
			name: 'To Do',
			value: tasks.filter(task => task.status === 'todo').length
		},
		{
			name: 'In Progress',
			value: tasks.filter(task => task.status === 'in-progress').length
		},
		{
			name: 'Done',
			value: tasks.filter(task => task.status === 'done').length
		}
	]
)

export const selectTasksByPriority = createSelector(
	[(tasks: Task[]) => tasks],
	tasks => [
		{
			name: 'High',
			value: tasks.filter(task => task.priority === 'high').length
		},
		{
			name: 'Medium',
			value: tasks.filter(task => task.priority === 'medium').length
		},
		{
			name: 'Low',
			value: tasks.filter(task => task.priority === 'low').length
		}
	]
)
