import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
	DialogTitle
} from '@/components/ui/dialog'
import type { Project } from '@/entities/project'
import { useState, type ReactElement } from 'react'
import { ProjectForm } from './ProjectForm'

interface ProjectFormDialogProps {
	trigger: ReactElement
	initialValue?: Project
}

export const ProjectFormDialog = ({
	trigger,
	initialValue
}: ProjectFormDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const isEditMode = Boolean(initialValue)

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogTrigger render={trigger}></DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						{isEditMode ? 'Изменить проект' : 'Создать проект'}
					</DialogTitle>

					<ProjectForm
						initialValue={initialValue}
						onSuccess={() => setIsOpen(false)}
					></ProjectForm>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	)
}
