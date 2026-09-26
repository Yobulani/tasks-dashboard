import { AdminStats } from '@/widgets/AdminStats'
import { TaskStats } from '@/widgets/TaskStats'

export const AdminDashboardPage = () => {
	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-6'>Админ-панель</h1>
			<div className='mb-6'>
				<AdminStats></AdminStats>
			</div>
			<TaskStats></TaskStats>
		</div>
	)
}
