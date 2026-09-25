import {
	TableHeader,
	TableRow,
	TableHead,
	TableBody,
	TableCell,
	Table
} from '@/components/ui/table'
import { type User } from '@/entities/user'
import { DeleteUserButton } from '@/features/delete-user'
import { UserFormDialog } from '@/features/user-form'
import { useSortableData } from '@/shared/lib/hooks'
import { ArrowDown, ArrowUp, LucideSquarePen, LucideTrash } from 'lucide-react'

interface UserTableProps {
	users: User[] | undefined
}

const columns = [
	{ key: 'name', label: 'Имя' },
	{ key: 'email', label: 'Email' },
	{ key: 'role', label: 'Роль' }
] as const

export const UserTable = ({ users }: UserTableProps) => {
	const { sortKey, direction, toggleSort, sortedItems } = useSortableData(
		users,
		null
	)

	if (!users || users.length === 0) {
		return <p className='text-gray-500'>Пользователей нет</p>
	}

	return (
		<Table>
			<TableHeader>
				<TableRow>
					{columns.map(column => (
						<TableHead
							className='cursor-pointer'
							key={column.key}
							onClick={() => toggleSort(column.key)}
						>
							<div className='flex items-center gap-1'>
								{column.label}
								{sortKey === column.key &&
									(direction === 'asc' ? (
										<ArrowUp className='w-4 h-4' />
									) : (
										<ArrowDown className='w-4 h-4' />
									))}
							</div>
						</TableHead>
					))}
					<TableHead>Действия</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{sortedItems.map(user => (
					<TableRow key={user.id}>
						<TableCell>{user.name}</TableCell>
						<TableCell>{user.email}</TableCell>
						<TableCell>{user.role}</TableCell>
						<TableCell>
							<UserFormDialog
								initialValue={user}
								trigger={
									<LucideSquarePen className='w-5 h-5 text-purple-500 hover:text-purple-700'></LucideSquarePen>
								}
							></UserFormDialog>
							<DeleteUserButton
								user={user}
								trigger={
									<LucideTrash className='w-5 h-5 text-purple-500 hover:text-purple-700'></LucideTrash>
								}
							></DeleteUserButton>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
