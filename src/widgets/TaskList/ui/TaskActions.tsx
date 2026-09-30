import { Button } from '@/components/ui/button'
import type { Task } from '@/entities/task'
import { DeleteTaskButton } from '@/features/delete-task'
import { TaskFormDialog } from '@/features/task-form'
import { memo } from 'react'

interface TaskActionsProps {
	task: Task
}

export const TaskActions = memo(({ task }: TaskActionsProps) => {
	return (
		<>
			<TaskFormDialog
				trigger={<Button variant='ghost'>Редактировать</Button>}
				initialValue={task}
			></TaskFormDialog>
			<DeleteTaskButton task={task}></DeleteTaskButton>
		</>
	)
})
