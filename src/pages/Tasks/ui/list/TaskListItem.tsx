import { TaskCard, type Task } from '@/entities/task'
import { DeleteTaskDialog } from '../dialogs/DeleteTaskDialog'
import { DeleteTaskMenuItem } from '../action-buttons/DeleteTaskMenuItem'
import { TaskFormDialog } from '../dialogs/TaskFormDialog'
import { TaskFormMenuItem } from '../action-buttons/TaskFormMenuItem'
import { Actions } from '@/shared/ui'
import { memo, useState } from 'react'

type ModalType = 'edit' | 'delete' | null

interface TaskListItemProps {
	task: Task
	assigneeName?: string
	projectName?: string
}

export const TaskListItem = memo(
	({ task, assigneeName, projectName }: TaskListItemProps) => {
		const [openedModal, setOpenedModal] = useState<ModalType>(null)

		return (
			<>
				<TaskCard
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
				></TaskCard>

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
