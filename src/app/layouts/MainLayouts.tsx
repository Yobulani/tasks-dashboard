import { PageLoader } from '@/shared/ui/PageLoader'
import Header from '@/widgets/Header'
import Sidebar from '@/widgets/Sidebar'
import { Suspense } from 'react'
import { useOutlet } from 'react-router-dom'

const MainLayout = () => {
	const outlet = useOutlet()

	return (
		<div className='flex h-screen bg-background-secondary text-foreground'>
			<Sidebar></Sidebar>
			<div className='flex flex-col flex-1'>
				<Header></Header>
				<main className='flex-1 overflow-auto'>
					<Suspense fallback={<PageLoader></PageLoader>}>{outlet}</Suspense>
				</main>
			</div>
		</div>
	)
}

export default MainLayout
