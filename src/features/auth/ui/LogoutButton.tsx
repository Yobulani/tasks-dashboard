import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { useNavigate } from 'react-router-dom'
import { logout, selectCurrentUser } from '../model/authSlice'
import { Button } from '@/components/ui/button'

export const LogoutButton = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const user = useAppSelector(selectCurrentUser)

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login', { replace: true })
	}

	return (
		<div className='flex items-center gap-3'>
			<span className='text-sm text-gray-600'>{user?.name}</span>
			<Button
				variant='ghost'
				size='sm'
				onClick={handleLogout}
			>
				Выйти
			</Button>
		</div>
	)
}
