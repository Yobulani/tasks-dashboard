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
				className='form-control form-admin-control'
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
