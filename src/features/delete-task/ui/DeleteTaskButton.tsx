import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useRemoveTaskMutation, type Task } from '@/entities/task'
import { useState } from 'react'

interface DeleteTaskButtonProps {
	task: Task
}

export const DeleteTaskButton = ({ task }: DeleteTaskButtonProps) => {
	const [removeTask, { isLoading: isRemoving }] = useRemoveTaskMutation()
	const [isOpen, setIsOpen] = useState(false)

	const handleDelete = async () => {
		try {
			await removeTask(task.id).unwrap()

			setIsOpen(true)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<AlertDialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<AlertDialogTrigger
				render={
					<Button
						variant='ghost'
						size='sm'
					></Button>
				}
			>
				Удалить
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Удалить задачу?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Задача {task.title} будет удалена навсегда. Продолжить?
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Отменить</AlertDialogCancel>
					<AlertDialogAction
						className='bg-red-400 hover:bg-red-500'
						disabled={isRemoving}
						onClick={handleDelete}
					>
						Удалить задачу
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
