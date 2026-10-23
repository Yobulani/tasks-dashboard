import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import type { Task } from '@/entities/task'
import { useState, type ReactElement } from 'react'
import { TaskForm } from './TaskForm'

interface TaskFormDialogProps {
	initialValue?: Task
	trigger?: ReactElement
	open?: boolean
	onOpenChange?: (open: boolean) => void
}

export const TaskFormDialog = ({
	initialValue,
	trigger,
	open: controlledOpen,
	onOpenChange: controlledOnOpenChange
}: TaskFormDialogProps) => {
	const isEditMode = Boolean(initialValue)
	const [internalOpen, setInternalOpen] = useState(false)

	const isControlled = controlledOpen !== undefined
	const open = isControlled ? controlledOpen : internalOpen

	const setOpen = (newOpen: boolean) => {
		if (isControlled) {
			controlledOnOpenChange?.(newOpen)
		} else {
			setInternalOpen(newOpen)
		}
	}

	const renderTrigger = () => {
		if (trigger) {
			return <DialogTrigger render={trigger}></DialogTrigger>
		}

		if (!isControlled) {
			return (
				<DialogTrigger
					render={<Button>+ Создать задачу</Button>}
				></DialogTrigger>
			)
		}

		return null
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			{renderTrigger()}
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? 'Редактировать задачу' : 'Создать задачу'}
					</DialogTitle>
				</DialogHeader>
				<TaskForm
					initialValue={initialValue}
					onSuccess={() => setOpen(false)}
				></TaskForm>
			</DialogContent>
		</Dialog>
	)
}
