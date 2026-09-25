import { UserRoleSelect } from '@/entities/user'
import type { UserRole } from '@/shared/constants/user'

interface UserFiltersProps {
	search: string
	role: UserRole | null
	onRoleChange: (role: UserRole | null) => void
	onSearchChange: (search: string) => void
}

export const UserFilters = ({
	search,
	role,
	onRoleChange,
	onSearchChange
}: UserFiltersProps) => {
	return (
		<div className='flex gap-4'>
			<input
				className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
				placeholder='Имя или e-mail'
				value={search}
				onChange={e => onSearchChange(e.target.value)}
			></input>
			<UserRoleSelect
				value={role}
				onChange={onRoleChange}
				allowAll
			></UserRoleSelect>
		</div>
	)
}
