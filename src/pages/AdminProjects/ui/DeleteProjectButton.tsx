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
import { useRemoveProjectMutation, type Project } from '@/entities/project'
import { useState, type ReactElement } from 'react'

interface DeleteProjectButtonProps {
	project: Project
	trigger?: ReactElement
}

export const DeleteProjectButton = ({
	trigger,
	project
}: DeleteProjectButtonProps) => {
	const [removeProject, { isLoading }] = useRemoveProjectMutation()
	const [isOpen, setIsOpen] = useState(false)

	const handleDelete = async () => {
		try {
			await removeProject(project.id).unwrap()

			setIsOpen(false)
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
						size='icon'
					>
						{trigger || 'Удалить'}
					</Button>
				}
			></AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Удалить проект?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Проект {project.name} будет навсегда удален. Продолжить?
				</AlertDialogDescription>
				<AlertDialogFooter>
					<AlertDialogCancel>Отмена</AlertDialogCancel>
					<AlertDialogAction
						className='bg-red-400 hover:bg-red-500'
						disabled={isLoading}
						onClick={handleDelete}
					>
						Удалить
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}
