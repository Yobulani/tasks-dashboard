import { useGetUsersQuery } from '@/entities/user'
import { useFilteredUsers, UserFilters } from '@/features/user-filters'
import { UserFormDialog } from '@/features/user-form'
import type { UserRole } from '@/shared/constants/user'
import { UserTable } from '@/widgets/UserTable'
import { useDeferredValue, useState } from 'react'

export const AdminUsersPage = () => {
	const { isLoading, isError, data: users } = useGetUsersQuery()
	const [search, setSearch] = useState('')
	const [role, setRole] = useState<UserRole | null>(null)

	const deferredSearch = useDeferredValue(search)

	const filteredUsers = useFilteredUsers(users, {
		search: deferredSearch,
		role
	})

	if (isLoading) {
		return <div className='p-8'>Loading...</div>
	}

	if (isError) {
		return <div className='p-8 text-red-500'>Oops...</div>
	}

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-6'>Пользователи</h1>

			<div className='mb-3'>
				<UserFilters
					search={search}
					role={role}
					onRoleChange={role => setRole(role)}
					onSearchChange={search => setSearch(search)}
				></UserFilters>
			</div>

			<div className='mb-2'>
				<UserFormDialog></UserFormDialog>
			</div>

			<div className='space-y-3'>
				<UserTable users={filteredUsers}></UserTable>
			</div>
		</div>
	)
}
