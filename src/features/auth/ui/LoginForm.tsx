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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

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
		<Command className='rounded-lg border shadow-md'>
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
							<div className='flex items-center gap-3 w-full'>
								<Avatar className='w-10 h-10'>
									<AvatarImage src={user.avatarUrl} />
									<AvatarFallback>
										<span className='text-3xl'>{user.name.charAt(0)}</span>
									</AvatarFallback>
								</Avatar>
								<div className='flex flex-col'>
									<span className='text-sm font-medium'>{user.name}</span>
									<span className='text-xs text-muted-foreground'>
										{user.email}
									</span>
									<Badge
										className='mt-1'
										variant={user.role === 'admin' ? 'default' : 'outline'}
									>
										{user.role === 'admin' ? 'Администратор' : 'Пользователь'}
									</Badge>
								</div>
							</div>
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	)
}
