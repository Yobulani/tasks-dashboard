import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { User } from '@/entities/user'
import { Pencil } from 'lucide-react'

interface ProfileViewProps {
	currentUser: User
	onEdit: () => void
}

export const ProfileView = ({ currentUser, onEdit }: ProfileViewProps) => {
	return (
		<div className='p-8'>
			<div className='max-w-xl mx-auto bg-card border border-border rounded-xl'>
				<div className='p-6 flex items-center gap-5 border-b border-border bg-muted/20'>
					<Avatar className='w-16 h-16 border-2 border-background'>
						<AvatarImage src={currentUser.avatarUrl} />
						<AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div className='flex-1'>
						<h2 className='text-lg font-bold'>{currentUser.name}</h2>
						<p className='text-sm text-muted-foreground'>{currentUser.email}</p>
					</div>
					<Badge variant='secondary'>
						{currentUser.role === 'admin' ? 'Администратор' : 'Пользователь'}
					</Badge>
				</div>

				<div className='p-6 space-y-4'>
					<p className='text-sm text-muted-foreground'>
						Вы можете обновить свои личные данные или изменить фотографию
						профиля.
					</p>

					<Button
						onClick={onEdit}
						className='w-full sm:w-auto'
					>
						<Pencil className='w-4 h-4 mr-2' />
						Редактировать профиль
					</Button>
				</div>
			</div>
		</div>
	)
}
