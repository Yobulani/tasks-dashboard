import { useMemo, type ReactNode } from 'react'
import { NavLink } from 'react-router-dom'

interface MenuItem {
	path: string
	label: string
	icon?: ReactNode
}

const Sidebar = () => {
	const Links: MenuItem[] = useMemo(
		() => [
			{ path: '/', label: 'Dashboard' },
			{ path: '/projects', label: 'Projects' },
			{ path: '/tasks', label: 'Tasks' }
		],
		[]
	)

	return (
		<div className='flex flex-col w-64 border-r'>
			{Links.map(link => (
				<NavLink
					className={({ isActive }) =>
						isActive
							? 'bg-blue-100 text-blue-700'
							: 'text-gray-600 hover:bg-gray-100'
					}
					to={link.path}
					key={link.label}
				>
					{link.label}
				</NavLink>
			))}
		</div>
	)
}

export default Sidebar
