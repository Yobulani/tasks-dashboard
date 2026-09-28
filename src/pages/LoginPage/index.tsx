import { LoginForm } from '@/features/auth'

export const LoginPage = () => {
	return (
		<div className='min-h-screen flex justify-center items-center bg-background-secondary'>
			<div className='bg-card p-8 rounded-lg shadow-md w-full max-w-md'>
				<h1 className='text-2xl mb-6 font-bold '>Вход</h1>
				<LoginForm></LoginForm>
			</div>
		</div>
	)
}
