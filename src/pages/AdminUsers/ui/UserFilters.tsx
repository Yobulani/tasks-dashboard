import { Input } from '@/components/ui/input'
import { UserRoleSelect, type UserRole } from '@/entities/user'

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
