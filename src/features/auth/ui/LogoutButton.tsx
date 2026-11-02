import { useAppDispatch } from '@/shared/lib/hooks'
import { useNavigate } from 'react-router-dom'
import { logout } from '../model/authSlice'
import { Button } from '@/components/ui/button'

export const LogoutButton = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const handleLogout = () => {
		dispatch(logout())
		navigate('/login', { replace: true })
	}

	return (
		<Button
			variant='ghost'
			size='sm'
			onClick={handleLogout}
		>
			Выйти
		</Button>
	)
}
