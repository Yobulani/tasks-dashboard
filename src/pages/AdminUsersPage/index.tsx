import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { useGetUsersQuery } from '@/entities/user'
import { DeleteUserButton } from '@/features/delete-user'
import { UserFormDialog } from '@/features/user-form'
import { LucideSquarePen, LucideTrash } from 'lucide-react'

export const AdminUsersPage = () => {
	const { isLoading, data: users } = useGetUsersQuery()

	if (isLoading) {
		return <p>Загрузка...</p>
	}

	if (!users?.length) {
		return <p>Пользователей нет</p>
	}

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-6'>Пользователи</h1>

			<div className='mb-3'>
				<UserFormDialog></UserFormDialog>
			</div>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Имя</TableHead>
						<TableHead>E-mail</TableHead>
						<TableHead>Роль</TableHead>
						<TableHead>Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map(user => (
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
		</div>
	)
}
