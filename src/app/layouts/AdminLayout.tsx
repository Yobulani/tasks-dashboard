import Header from '@/widgets/Header'
import AdminSidebar from '@/widgets/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { PageLoader } from '@/shared/ui/PageLoader'

const AdminLayout = () => {
	return (
		<div className='flex h-screen bg-background-secondary text-foreground'>
			<AdminSidebar></AdminSidebar>
			<div className='flex flex-col flex-1'>
				<Header></Header>
				<main className='flex-1 overflow-auto'>
					<Suspense fallback={<PageLoader></PageLoader>}>
						<Outlet></Outlet>
					</Suspense>
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
