import { useGetUsersQuery } from '@/entities/user'
import { FormField } from '@/shared/ui/FormField'

interface UserSelectProps {
	value: string | null
	onChange: (value: string | null) => void
}

export const UserSelect = ({ value, onChange }: UserSelectProps) => {
	const { isLoading, data: users } = useGetUsersQuery()

	return (
		<FormField label='Пользователь'>
			<select
				value={value ?? ''}
				onChange={e => onChange(e.target.value || null)}
				className='form-control'
			>
				<option value=''>Исполнитель не назначен</option>
				{isLoading
					? 'Загрузка...'
					: users?.map(user => (
							<option
								value={user.id}
								key={user.id}
							>
								{user.name}
							</option>
						))}
			</select>
		</FormField>
	)
}
