import { TASK_PRIORITIES, TASK_STATUSES } from '@/shared/constants/task'
import { z } from 'zod'

export const taskFormSchema = z.object({
	title: z
		.string()
		.min(3, 'Минимум 3 символа')
		.max(100, 'Максимум 100 символов'),
	description: z.string().max(500).or(z.literal('')),
	status: z.enum(TASK_STATUSES),
	priority: z.enum(TASK_PRIORITIES),
	projectId: z.string().min(1, 'Укажите id проекта'),
	assigneeId: z.string().nullable()
})

export type TaskFormValues = z.infer<typeof taskFormSchema>
