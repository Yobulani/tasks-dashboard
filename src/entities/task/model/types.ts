export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

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
