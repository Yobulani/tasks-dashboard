export const TASK_STATUS_OPTIONS = [
	{ value: 'todo', label: 'To Do' },
	{ value: 'in-progress', label: 'In Progress' },
	{ value: 'done', label: 'Done' }
] as const

export const TASK_PRIORITY_OPTIONS = [
	{ value: 'low', label: 'Low' },
	{ value: 'medium', label: 'Medium' },
	{ value: 'high', label: 'High' }
] as const

export type TaskPriority = (typeof TASK_PRIORITY_OPTIONS)[number]['value']
export type TaskStatus = (typeof TASK_STATUS_OPTIONS)[number]['value']

export const TASK_PRIORITIES = TASK_PRIORITY_OPTIONS.map(option => option.value)
export const TASK_STATUSES = TASK_STATUS_OPTIONS.map(option => option.value)
