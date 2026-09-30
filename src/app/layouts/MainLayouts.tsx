import { PageLoader } from '@/shared/ui/PageLoader'
import Header from '@/widgets/Header'
import Sidebar from '@/widgets/Sidebar'
import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
	return (
		<div className='flex h-screen bg-background-secondary text-foreground'>
			<Sidebar></Sidebar>
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

export default MainLayout
