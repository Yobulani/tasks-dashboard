import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { useGetUsersQuery } from '@/entities/user'

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

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Имя</TableHead>
						<TableHead>E-mail</TableHead>
						<TableHead>Роль</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map(user => (
						<TableRow key={user.id}>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	)
}
