import { useGetUsersQuery } from '@/entities/user'
import type { UserRole } from '@/shared/config'
import { UserTable } from './UserTable'
import { UserFormDialog } from './UserFormDialog'
import { useDeferredValue, useState } from 'react'
import { useFilteredUsers } from '../model/useFilteredUsers'
import { UserFilters } from './UserFilters'

const AdminUsers = () => {
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
			<div className='flex flex-col items-start gap-4 mb-6'>
				<UserFormDialog></UserFormDialog>

				<UserFilters
					search={search}
					role={role}
					onRoleChange={role => setRole(role)}
					onSearchChange={search => setSearch(search)}
				></UserFilters>
			</div>

			<UserTable users={filteredUsers}></UserTable>
		</div>
	)
}

export default AdminUsers
