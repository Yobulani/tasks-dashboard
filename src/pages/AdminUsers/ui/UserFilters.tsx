import { Input } from '@/components/ui/input'
import { UserRoleSelect } from '@/entities/user'
import type { UserRole } from '@/shared/config'

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
		<div className='grid grid-cols-2 gap-4'>
			<Input
				className='form-admin-control'
				placeholder='Имя или e-mail'
				value={search}
				onChange={e => onSearchChange(e.target.value)}
			/>
			<UserRoleSelect
				value={role}
				onChange={onRoleChange}
				allowAll
			></UserRoleSelect>
		</div>
	)
}
