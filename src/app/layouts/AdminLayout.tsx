import Header from '@/widgets/Header'
import AdminSidebar from '@/widgets/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
	return (
		<div className='flex h-screen bg-gray-50'>
			<AdminSidebar></AdminSidebar>
			<div className='flex flex-col flex-1'>
				<Header></Header>
				<main className='flex-1 overflow-auto'>
					<Outlet></Outlet>
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
