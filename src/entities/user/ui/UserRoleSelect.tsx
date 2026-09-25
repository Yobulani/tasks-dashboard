import { USER_ROLE_OPTIONS, type UserRole } from '@/shared/constants/user'

interface UserRoleSelectProps {
	value: UserRole | null
	onChange: (e: UserRole | null) => void
	allowAll?: boolean
}

export const UserRoleSelect = ({
	allowAll,
	value,
	onChange
}: UserRoleSelectProps) => {
	return (
		<select
			className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
			value={value ?? ''}
			onChange={e => onChange((e.target.value as UserRole) || null)}
		>
			{allowAll && <option value=''>Все роли</option>}

			{USER_ROLE_OPTIONS.map(role => (
				<option
					key={role.value}
					value={role.value}
				>
					{role.label}
				</option>
			))}
		</select>
	)
}
