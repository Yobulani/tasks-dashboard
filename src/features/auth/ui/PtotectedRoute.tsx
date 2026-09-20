import { useAppSelector } from '@/shared/lib/hooks'
import { selectAuthenticated } from '../model/authSlice'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
	const isAuthenticated = useAppSelector(selectAuthenticated)

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/login'
				replace
			></Navigate>
		)
	}

	return <Outlet></Outlet>
}
