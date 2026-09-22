import { useGetProjectsQuery } from '@/entities/project'
import { useGetTasksQuery } from '@/entities/task'
import { useGetUsersQuery } from '@/entities/user'
import { StatCard } from '@/shared/ui/StatCard'

export const AdminStats = () => {
	const { data: users } = useGetUsersQuery()
	const { data: projects } = useGetProjectsQuery()
	const { data: tasks } = useGetTasksQuery()

	return (
		<div className='grid grid-cols-4 gap-4'>
			<StatCard
				label='Проекты'
				value={projects?.length ?? 0}
			></StatCard>
			<StatCard
				label='Пользователи'
				value={users?.length ?? 0}
			></StatCard>
			<StatCard
				label='Задачи'
				value={tasks?.length ?? 0}
			></StatCard>
			<StatCard
				label='Задачи в работе'
				value={tasks?.filter(task => task.status === 'in-progress').length ?? 0}
			></StatCard>
		</div>
	)
}
