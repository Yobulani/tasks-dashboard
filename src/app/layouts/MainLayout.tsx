import { PageLoader } from '@/shared/ui'
import { Header } from '@/widgets/Header'
import { Sidebar } from '@/widgets/Sidebar'
import { Suspense } from 'react'
import { useOutlet } from 'react-router-dom'
import { ThemeProvider } from '../providers/ThemeProvider'

const MainLayout = () => {
	const outlet = useOutlet()

	return (
		<ThemeProvider>
			<div className='flex h-screen w-screen bg-background-secondary text-foreground'>
				<Sidebar></Sidebar>
				<div className='flex flex-col flex-1 min-w-0'>
					<Header></Header>
					<main className='flex-1 overflow-auto'>
						<div className='min-w-5xl'>
							<Suspense fallback={<PageLoader></PageLoader>}>{outlet}</Suspense>
						</div>
					</main>
				</div>
			</div>
		</ThemeProvider>
	)
}

export default MainLayout
