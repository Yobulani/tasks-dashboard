import Header from '@/widgets/Header'
import Sidebar from '@/widgets/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
	return (
		<div className='flex h-screen bg-gray-50'>
			<Sidebar></Sidebar>
			<div className='flex flex-col flex-1'>
				<Header></Header>
				<main className='flex-1 overflow-auto'>
					<Outlet></Outlet>
				</main>
			</div>
		</div>
	)
}

export default MainLayout
