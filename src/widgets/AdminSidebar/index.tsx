import {
	LayoutDashboard,
	Users,
	FolderKanban,
	type LucideIcon
} from 'lucide-react'
import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'

interface MenuItem {
	path: string
	label: string
	icon: LucideIcon
}

const AdminSidebar = () => {
	const Links: MenuItem[] = useMemo(
		() => [
			{ path: '/admin', label: 'Обзор', icon: LayoutDashboard },
			{ path: '/admin/users', label: 'Пользователи', icon: Users },
			{ path: '/admin/projects', label: 'Проекты', icon: FolderKanban }
		],
		[]
	)

	return (
		<aside className='w-64 flex flex-col h-screen bg-white border-r border-gray-200'>
			<nav className='flex-1 p-6 flex-col space-y-1'>
				{Links.map(({ path, label, icon: Icon }) => (
					<NavLink
						end
						className={({ isActive }) =>
							`flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
								isActive
									? 'bg-purple-50 text-purple-700'
									: 'text-gray-600 hover:bg-gray-100  hover:text-gray-900'
							}`
						}
						to={path}
						key={label}
					>
						<Icon className='w-5 h-5' />
						{label}
					</NavLink>
				))}
			</nav>
		</aside>
	)
}

export default AdminSidebar
