import { LogoutButton } from '@/features/auth'
import { SwitchThemeButton } from '@/features/theme'
import { useDocumentTitle } from '@/shared/lib/useDocumentTitle'
import { useRouteTitle } from '@/shared/lib/useRouteTitle'

const Header = () => {
	const title = useRouteTitle()

	useDocumentTitle(title)

	return (
		<div className='flex justify-between border-b items-center pl-2'>
			<h1>{title}</h1>
			<div className='flex justify-between gap-2'>
				<SwitchThemeButton></SwitchThemeButton>
				<LogoutButton></LogoutButton>
			</div>
		</div>
	)
}

export default Header
