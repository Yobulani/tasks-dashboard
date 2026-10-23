import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import type { Task } from '@/entities/task'
import { DeleteTaskButton } from '@/features/delete-task'
import { TaskFormDialog } from '@/features/task-form'
import { MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { memo, useState } from 'react'

interface TaskActionsProps {
	task: Task
}

export const TaskActions = memo(({ task }: TaskActionsProps) => {
	const [isEditOpen, setIsEditOpen] = useState(false)

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button
							variant='ghost'
							size='icon'
						>
							<MoreVertical></MoreVertical>
						</Button>
					}
				></DropdownMenuTrigger>

				<DropdownMenuContent
					align='end'
					side='right'
					className='w-48'
				>
					<Button
						variant='ghost'
						className='w-full justify-start gap-2 px-2 py-1.5 h-auto font-normal cursor-pointer'
						onClick={() => setIsEditOpen(true)}
					>
						<Pencil></Pencil>Редактировать
					</Button>

					<DeleteTaskButton
						task={task}
						trigger={
							<Button
								variant='ghost'
								className='w-full justify-start gap-2 px-2 py-1.5 h-auto font-normal cursor-pointer text-destructive'
							>
								<Trash2></Trash2>Удалить
							</Button>
						}
					></DeleteTaskButton>
				</DropdownMenuContent>
			</DropdownMenu>

			<TaskFormDialog
				initialValue={task}
				open={isEditOpen}
				onOpenChange={setIsEditOpen}
			></TaskFormDialog>
		</>
	)
})
