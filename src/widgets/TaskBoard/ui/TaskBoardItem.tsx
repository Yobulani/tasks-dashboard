import type { Task } from '@/entities/task'
import { DraggableTask } from './DraggableTask'
import { memo, useState } from 'react'
import { TaskFormDialog, TaskFormMenuItem } from '@/features/task-form'
import { DeleteTaskDialog, DeleteTaskMenuItem } from '@/features/delete-task'
import { Actions } from '@/shared/ui'

type ModalType = 'edit' | 'delete' | null

interface TaskBoardItemProps {
	task: Task
	assigneeName?: string
	projectName?: string
}

export const TaskBoardItem = memo(
	({ task, assigneeName, projectName }: TaskBoardItemProps) => {
		const [openedModal, setOpenedModal] = useState<ModalType>(null)

		return (
			<>
				<DraggableTask
					task={task}
					assigneeName={assigneeName}
					projectName={projectName}
					actions={
						<Actions>
							<TaskFormMenuItem
								onSelect={() => setOpenedModal('edit')}
							></TaskFormMenuItem>
							<DeleteTaskMenuItem
								onSelect={() => setOpenedModal('delete')}
							></DeleteTaskMenuItem>
						</Actions>
					}
				></DraggableTask>

				<TaskFormDialog
					initialValue={task}
					open={openedModal === 'edit'}
					onOpenChange={open => setOpenedModal(open ? 'edit' : null)}
				></TaskFormDialog>

				<DeleteTaskDialog
					task={task}
					open={openedModal === 'delete'}
					onOpenChange={open => setOpenedModal(open ? 'delete' : null)}
				></DeleteTaskDialog>
			</>
		)
	}
)
