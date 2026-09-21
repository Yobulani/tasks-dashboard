import { Link } from 'react-router-dom'

export const ForbiddenPage = () => {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='text-center'>
				<h1 className='text-6xl font-bold text-gray-800'>403</h1>
				<p className='text-xl mt-4 text-gray-600'>Доступ запрещён</p>
				<p className='mt-2 text-gray-500'>
					У вас нет прав для просмотра этой страницы
				</p>
				<Link
					className='inline-block mt-6 text-blue-600 hover:underline'
					to='/'
				>
					Вернуться на главную
				</Link>
			</div>
		</div>
	)
}
