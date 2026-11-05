import { useGetUsersQuery } from '@/entities/user'
import { useAppDispatch } from '@/shared/lib'
import { login } from '../model/authSlice'
import { useNavigate } from 'react-router-dom'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'

export const LoginForm = () => {
	const { data: users, isLoading } = useGetUsersQuery()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	if (isLoading) {
		return 'Загрузка...'
	}

	const handleLogin = (userId: string) => {
		const user = users?.find(item => item.id === userId)

		if (user) {
			dispatch(login(user))

			switch (user.role) {
				case 'admin':
					navigate('/admin', { replace: true })
					break
				default:
					navigate('/', { replace: true })
			}
		}
	}

	return (
		<Command>
			<CommandInput placeholder='Введите имя или e-mail'></CommandInput>
			<CommandList>
				<CommandEmpty>Пользователь не найден</CommandEmpty>
				<CommandGroup heading='Пользователи'>
					{users?.map(user => (
						<CommandItem
							key={user.id}
							onSelect={user => handleLogin(user)}
							value={user.id}
							keywords={[user.name, user.email]}
							className='cursor-pointer'
						>
							<p className={user.role === 'admin' ? 'text-green-300' : ''}>
								{user.name}
							</p>
							<span className='text-muted-foreground'>{user.email}</span>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
