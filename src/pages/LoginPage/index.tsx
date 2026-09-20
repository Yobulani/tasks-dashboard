import { LoginForm } from '@/features/auth'

export const LoginPage = () => {
	return (
		<div className='min-h-screen flex justify-center items-center bg-gray-50'>
			<div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
				<h1 className='text-2xl mb-6 font-bold text-gray-800'>Вход</h1>
				<LoginForm></LoginForm>
			</div>
		</div>
	)
}
