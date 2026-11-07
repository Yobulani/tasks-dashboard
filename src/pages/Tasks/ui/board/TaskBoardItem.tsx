import type { Task } from '@/entities/task'
import { DraggableTask } from '../dnd/DraggableTask'
import { memo, useState } from 'react'
import { TaskFormDialog } from '../dialogs/TaskFormDialog'
import { TaskFormMenuItem } from '../action-buttons/TaskFormMenuItem'
import { DeleteTaskDialog } from '../dialogs/DeleteTaskDialog'
import { DeleteTaskMenuItem } from '../action-buttons/DeleteTaskMenuItem'
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
