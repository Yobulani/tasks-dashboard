export type {
	Task,
	TaskPriority,
	TaskStatus,
	CreateTaskDto
} from './model/types'

export { TaskCard } from './ui/TaskCard'

export { useGetTasksQuery } from './api/taskApi'

// UI (раскомментируете, когда создадите TaskCard)
// export { TaskCard } from './ui/TaskCard';
