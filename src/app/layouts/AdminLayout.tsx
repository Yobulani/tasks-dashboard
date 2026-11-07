import { Header } from '@/widgets/Header'
import { AdminSidebar } from '@/widgets/AdminSidebar'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
import { PageLoader } from '@/shared/ui'

const AdminLayout = () => {
	return (
		<div className='flex h-screen w-screen bg-background-secondary text-foreground'>
			<AdminSidebar></AdminSidebar>
			<div className='flex flex-col flex-1 min-w-0'>
				<Header></Header>
				<main className='flex-1 overflow-auto'>
					<div className='min-w-5xl'>
						<Suspense fallback={<PageLoader></PageLoader>}>
							<Outlet></Outlet>
						</Suspense>
					</div>
				</main>
			</div>
		</div>
	)
}

export default AdminLayout
