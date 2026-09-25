import type { User } from '@/entities/user'
import type { UserRole } from '@/shared/constants/user'
import { useMemo } from 'react'

interface Filters {
	search: string
	role: UserRole | null
}

export const useFilteredUsers = (
	users: User[] | undefined,
	{ search, role }: Filters
) => {
	return useMemo(() => {
		return (
			users?.filter(user => {
				const formattedSearch = search.toLowerCase()
				const matchesSearch =
					user.name.toLowerCase().includes(formattedSearch) ||
					user.email.toLowerCase().includes(formattedSearch)

				const matchesRoleFilter = !role || user.role === role

				return matchesRoleFilter && matchesSearch
			}) ?? []
		)
	}, [users, search, role])
}
