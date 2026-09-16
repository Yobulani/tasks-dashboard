import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import type { Task } from '@/entities/task'
import { useState } from 'react'
import { TaskForm } from './TaskForm'

interface TaskFormDialogProps {
	initialValue?: Task
	trigger?: React.ReactElement
}

export const TaskFormDialog = ({
	initialValue,
	trigger
}: TaskFormDialogProps) => {
	const isEditMode = Boolean(initialValue)
	const [isOpen, setIsOpen] = useState(false)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogTrigger
				render={trigger || <Button>+ Создать задачу</Button>}
			></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? 'Редактировать задачу' : 'Создать задачу'}
					</DialogTitle>
				</DialogHeader>
				<TaskForm
					initialValue={initialValue}
					onSuccess={() => setIsOpen(false)}
				></TaskForm>
			</DialogContent>
		</Dialog>
	)
}
