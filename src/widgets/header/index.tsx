import { LogoutButton } from '@/features/auth'

const Header = () => {
	return (
		<div className='flex justify-between border-b'>
			<h1>Tasks dashboard</h1>
			<LogoutButton></LogoutButton>
		</div>
	)
}

export default Header
