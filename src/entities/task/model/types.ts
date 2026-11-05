import type { TaskPriority, TaskStatus } from '@/shared/constants'

export interface Task {
	id: string
	title: string
	description: string
	status: TaskStatus
	priority: TaskPriority
	assigneeId: string | null
	projectId: string
	createdAt: string
}

export type CreateTaskDto = Omit<Task, 'id' | 'createdAt'>

export type UpdateTaskDto = Omit<Task, 'createdAt'>
