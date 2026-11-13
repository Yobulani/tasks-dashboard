import { Button } from '@/components/ui/button'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { useGetProjectsQuery } from '@/entities/project'
import { useGetUsersQuery } from '@/entities/user'
import { getById, useMap } from '@/shared/lib'
import { LucideSquarePen, LucideTrash } from 'lucide-react'
import { DeleteProjectButton } from './DeleteProjectButton'
import { ProjectFormDialog } from './ProjectFormDialog'

const AdminProjects = () => {
	const { isLoading, data: projects } = useGetProjectsQuery()
	const { data: users } = useGetUsersQuery()

	const usersMap = useMap(users, 'id')

	if (isLoading) {
		return <p>Загрузка...</p>
	}

	return (
		<div className='p-8'>
			<div className='flex flex-col items-start gap-4 mb-6'>
				<ProjectFormDialog
					trigger={
						<Button
							variant='default'
							size='sm'
						>
							+ Создать проект
						</Button>
					}
				></ProjectFormDialog>
			</div>

			{!projects?.length ? (
				<p>Проектов нет</p>
			) : (
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Название</TableHead>
							<TableHead>Описание</TableHead>
							<TableHead>Владелец</TableHead>
							<TableHead>Задач в работе</TableHead>
							<TableHead>Действия</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{projects.map(project => (
							<TableRow key={project.id}>
								<TableCell>{project.name}</TableCell>
								<TableCell className='whitespace-normal'>
									{project.description}
								</TableCell>
								<TableCell>
									{getById(usersMap, project.ownerId)?.name ?? ''}
								</TableCell>
								<TableCell>{project.taskCount}</TableCell>
								<TableCell>
									<ProjectFormDialog
										initialValue={project}
										trigger={
											<Button
												variant='ghost'
												size='icon'
											>
												<LucideSquarePen className='w-5 h-5 text-purple-500 hover:text-purple-700'></LucideSquarePen>
											</Button>
										}
									></ProjectFormDialog>
									<DeleteProjectButton
										project={project}
										trigger={
											<LucideTrash className='w-5 h-5 text-purple-500 hover:text-purple-700'></LucideTrash>
										}
									></DeleteProjectButton>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</div>
	)
}

export default AdminProjects
