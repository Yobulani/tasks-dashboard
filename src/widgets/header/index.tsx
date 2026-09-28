import { LogoutButton } from '@/features/auth'
import { SwitchThemeButton } from '@/features/theme'

const Header = () => {
	return (
		<div className='flex justify-between border-b'>
			<h1>Tasks dashboard</h1>
			<div className='flex justify-between gap-2'>
				<SwitchThemeButton></SwitchThemeButton>
				<LogoutButton></LogoutButton>
			</div>
		</div>
	)
}

export default Header
