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

export const AdminProjectsPage = () => {
	const { isLoading, data: projects } = useGetProjectsQuery()
	const { data: users } = useGetUsersQuery()

	if (isLoading) {
		return <p>Загрузка...</p>
	}

	if (!projects?.length) {
		return <p>Проектов нет</p>
	}

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-6'>Проекты</h1>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Название</TableHead>
						<TableHead>Описание</TableHead>
						<TableHead>Владелец</TableHead>
						<TableHead>Задач в работе</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{projects.map(project => (
						<TableRow key={project.id}>
							<TableCell>{project.name}</TableCell>
							<TableCell>{project.description}</TableCell>
							<TableCell>
								{users?.find(user => user.id === project.ownerId)?.name ?? ''}
							</TableCell>
							<TableCell>{project.taskCount}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
