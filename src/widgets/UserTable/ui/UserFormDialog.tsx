import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	DialogTitle
} from '@/components/ui/dialog'
import type { User } from '@/entities/user'
import { useState, type ReactElement } from 'react'
import { UserForm } from './UserForm'

interface UserFormDialog {
	trigger?: ReactElement
	initialValue?: User
}

export const UserFormDialog = ({ trigger, initialValue }: UserFormDialog) => {
	const [isOpen, setIsOpen] = useState(false)
	const isEditMode = Boolean(initialValue)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogTrigger
				render={
					<Button
						variant='ghost'
						size='sm'
					>
						{trigger || '+ Создать пользователя'}
					</Button>
				}
			></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? 'Измененить пользователя' : 'Создать пользователя'}
					</DialogTitle>

					<UserForm
						initialValue={initialValue}
						onSuccess={() => setIsOpen(false)}
					></UserForm>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
