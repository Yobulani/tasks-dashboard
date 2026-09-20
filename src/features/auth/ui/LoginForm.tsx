import { useGetUsersQuery } from '@/entities/user'
import { useAppDispatch } from '@/shared/lib/hooks'
import { useState } from 'react'
import { login } from '../model/authSlice'
import { useNavigate } from 'react-router-dom'

export const LoginForm = () => {
	const [selectedId, setSelectedId] = useState('')
	const { data: users, isLoading } = useGetUsersQuery()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	if (isLoading) {
		return 'Загрузка...'
	}

	const handleLogin = () => {
		const user = users?.find(item => item.id === selectedId)

		if (user) {
			dispatch(login(user))
			navigate('/', { replace: true })
		}
	}

	return (
		<div className='space-y-4'>
			<div>
				<label
					className='block text-sm text-gray-700 mb-1 font-medium'
					htmlFor='user-select'
				>
					Выберите пользователя
				</label>
				<select
					className='w-full px-3 py-2 border border-gray-300 rounded-md'
					id='user-select'
					value={selectedId}
					onChange={e => setSelectedId(e.target.value)}
				>
					<option value=''>Выберите пользователя</option>
					{users?.map(user => (
						<option
							key={user.id}
							value={user.id}
						>
							{`${user.name} | ${user.email}`}
						</option>
					))}
				</select>
			</div>

			<button
				className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white rounded-md py-2'
				disabled={!selectedId}
				onClick={handleLogin}
			>
				Войти
			</button>
		</div>
	)
}
