import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { USER_ROLE_OPTIONS, type UserRole } from '@/shared/config'

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
	const roles = allowAll
		? [{ value: null, label: 'Все роли' }, ...USER_ROLE_OPTIONS]
		: USER_ROLE_OPTIONS

	return (
		<Select
			items={roles}
			value={value}
			onValueChange={v => onChange(v)}
		>
			<SelectTrigger className='w-full'>
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				{roles.map(role => (
					<SelectItem
						value={role.value}
						key={role.value}
					>
						{role.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
