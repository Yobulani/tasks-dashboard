import { useGetUsersQuery } from '@/entities/user'

interface UserSelectProps {
	value: string | null
	onChange: (value: string | null) => void
}

export const UserSelect = ({ value, onChange }: UserSelectProps) => {
	const { isLoading, data: users } = useGetUsersQuery()

	return (
		<>
			<label className='mb-1 block font-medium text-sm text-gray-700'>
				Пользователь
			</label>
			<select
				value={value ?? ''}
				onChange={e => onChange(e.target.value || null)}
				className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
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
		</>
	)
}
