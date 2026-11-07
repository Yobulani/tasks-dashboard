import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { selectCurrentUser } from '@/entities/user'
import { LogoutButton } from '@/features/auth'
import { SwitchThemeButton } from '@/features/theme'
import { useAppSelector, useDocumentTitle, useRouteTitle } from '@/shared/lib'

const Header = () => {
	const user = useAppSelector(selectCurrentUser)
	const title = useRouteTitle()

	useDocumentTitle(title)

	return (
		<div className='flex justify-between border-b items-center pl-2'>
			<h1>{title}</h1>
			<div className='flex justify-between gap-2'>
				<SwitchThemeButton></SwitchThemeButton>
				<div className='flex items-center gap-3'>
					<div className='flex items-center gap-2'>
						<Avatar className='w-5 h-5'>
							{user?.avatarUrl && <AvatarImage src={user.avatarUrl} />}
							<AvatarFallback className='text-2xl'>
								{user?.name.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<span className='text-sm text-gray-600 truncate max-w-25 sm:max-w-40'>
							{user?.name}
						</span>
					</div>
					<LogoutButton></LogoutButton>
				</div>
			</div>
		</div>
	)
}

export default Header
