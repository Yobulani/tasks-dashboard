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
import { useState, type ReactElement } from 'react'

interface DeleteTaskDialogProps {
	task: Task
	trigger?: ReactElement
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export const DeleteTaskDialog = ({
	task,
	trigger,
	open: controlledOpen,
	onOpenChange: controlledOpenChange
}: DeleteTaskDialogProps) => {
	const [removeTask, { isLoading: isRemoving }] = useRemoveTaskMutation()
	const [internalOpen, setInternalOpen] = useState(false)

	const isControlled = controlledOpen !== undefined
	const open = isControlled ? controlledOpen : internalOpen

	const setOpen = (newOpen: boolean) => {
		if (isControlled) {
			controlledOpenChange?.(newOpen)
		} else {
			setInternalOpen(newOpen)
		}
	}

	const renderTrigger = () => {
		if (trigger) {
			return <AlertDialogTrigger render={trigger}></AlertDialogTrigger>
		}

		if (!isControlled) {
			return (
				<AlertDialogTrigger
					render={<Button>Удалить</Button>}
				></AlertDialogTrigger>
			)
		}

		return null
	}

	const handleDelete = async () => {
		try {
			await removeTask(task.id).unwrap()

			controlledOpenChange
				? controlledOpenChange(false)
				: setInternalOpen(false)
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<AlertDialog
			open={open}
			onOpenChange={setOpen}
		>
			{renderTrigger()}
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
