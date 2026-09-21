import { useAppSelector } from '@/shared/lib/hooks'
import { selectAuthenticated, selectUserRole } from '../model/authSlice'
import { Navigate, Outlet } from 'react-router-dom'
import type { UserRole } from '@/entities/user'

interface ProtectedRouteProps {
	requiredRole?: UserRole
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
	const isAuthenticated = useAppSelector(selectAuthenticated)
	const userRole = useAppSelector(selectUserRole)

	if (!isAuthenticated) {
		return (
			<Navigate
				to='/login'
				replace
			></Navigate>
		)
	}

	if (requiredRole && userRole !== requiredRole) {
		return (
			<Navigate
				to='/403'
				replace
			></Navigate>
		)
	}

	return <Outlet></Outlet>
}
