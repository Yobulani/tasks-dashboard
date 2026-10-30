import { useGetTasksQuery } from '@/entities/task'
import { selectCurrentUser } from '@/entities/user'
import { useFilteredTasks } from '@/features/task-filters'
import { useAppSelector } from '@/shared/lib/hooks'
import { TaskStats } from '@/widgets/TaskStats'
import { UserStats } from '@/widgets/UserStats'

const DashboardPage = () => {
	const { data: tasks, isLoading } = useGetTasksQuery()

	const currentUser = useAppSelector(selectCurrentUser)

	const myTasks = useFilteredTasks(tasks, {
		search: '',
		status: '',
		priority: '',
		assigneeId: currentUser?.id ?? null
	})

	return (
		<div className='p-8 space-y-8'>
			<div>
				<h1 className='text-2xl font-bold text-foreground'>
					Привет, {currentUser?.name}!
				</h1>
				<p className='text-muted-foreground'>
					Вот сводка по твоим текущим задачам
				</p>
			</div>

			{isLoading ? (
				<div className='space-y-4'>
					<div className='h-32 bg-muted animate-pulse rounded-lg' />
					<div className='h-64 bg-muted animate-pulse rounded-lg' />
				</div>
			) : (
				<>
					<UserStats tasks={myTasks}></UserStats>{' '}
					<TaskStats tasks={myTasks}></TaskStats>
				</>
			)}
		</div>
	)
}

export default DashboardPage
