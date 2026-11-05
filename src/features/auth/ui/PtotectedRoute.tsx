import { useAppSelector } from '@/shared/lib'
import { selectAuthenticated } from '../model/authSlice'
import { Navigate, useOutlet } from 'react-router-dom'
import type { UserRole } from '@/shared/constants'
import { selectUserRole } from '@/entities/user'

interface ProtectedRouteProps {
	requiredRole?: UserRole
}

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
	const isAuthenticated = useAppSelector(selectAuthenticated)
	const userRole = useAppSelector(selectUserRole)
	const outlet = useOutlet()

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

	return outlet
}
