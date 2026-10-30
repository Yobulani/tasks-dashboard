import { useGetTasksQuery } from '@/entities/task'
import { AdminStats } from '@/widgets/AdminStats'
import { TaskStats } from '@/widgets/TaskStats'

const AdminDashboardPage = () => {
	const { data: tasks } = useGetTasksQuery()

	return (
		<div className='p-8 space-y-6'>
			<h1 className='text-2xl font-bold '>Админ-панель</h1>

			<AdminStats></AdminStats>
			<TaskStats tasks={tasks ?? []}></TaskStats>
		</div>
	)
}

export default AdminDashboardPage
