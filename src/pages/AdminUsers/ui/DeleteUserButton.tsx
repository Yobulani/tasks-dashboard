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
import { useRemoveUserMutation, type User } from '@/entities/user'
import { useState, type ReactElement } from 'react'

interface DeleteUserButtonProps {
	user: User
	trigger?: ReactElement
}

export const DeleteUserButton = ({ trigger, user }: DeleteUserButtonProps) => {
	const [removeTask, { isLoading }] = useRemoveUserMutation()
	const [isOpen, setIsOpen] = useState(false)

	const handleDelete = async () => {
		try {
			await removeTask(user.id).unwrap()

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
					<AlertDialogTitle>Удалить пользователя?</AlertDialogTitle>
				</AlertDialogHeader>
				<AlertDialogDescription>
					Пользователь {user.name} будет навсегда удален. Продолжить?
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
