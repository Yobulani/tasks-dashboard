import type { Task } from '@/entities/task'
import { StatCard } from '@/shared/ui'

interface UserStatsProps {
	tasks: Task[]
}
export const UserStats = ({ tasks }: UserStatsProps) => {
	const todo = tasks.filter(task => task.status === 'todo')
	const inProgress = tasks.filter(task => task.status === 'in-progress')
	const done = tasks.filter(task => task.status === 'done')

	return (
		<div className='grid grid-cols-3 gap-4'>
			<StatCard
				label='Запланировано'
				value={todo.length ?? 0}
			></StatCard>
			<StatCard
				label='В работе'
				value={inProgress.length ?? 0}
			></StatCard>
			<StatCard
				label='Выполнено'
				value={done.length ?? 0}
			></StatCard>
		</div>
	)
}
