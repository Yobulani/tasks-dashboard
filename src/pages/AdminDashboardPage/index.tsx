import { AdminStats } from '@/widgets/AdminStats/ui/AdminStats'

export const AdminDashboardPage = () => {
	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-6'>Админ-панель</h1>
			<AdminStats></AdminStats>
		</div>
	)
}
