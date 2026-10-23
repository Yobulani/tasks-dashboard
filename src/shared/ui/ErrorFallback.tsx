import { AlertTriangle } from 'lucide-react'
import type { FallbackProps } from 'react-error-boundary'

export function ErrorFallback({ error }: FallbackProps) {
	console.log('jopa')
	return (
		<div className='flex flex-col items-center justify-center min-h-100 p-8 text-center bg-background rounded-lg border border-border'>
			<AlertTriangle className='w-12 h-12 text-destructive mb-4' />
			<h2 className='text-xl font-bold mb-2'>Что-то пошло не так</h2>
			<p className='text-muted-foreground mb-6 max-w-md'>
				{'Произошла непредвиденная ошибка при отображении этого блока.'}
			</p>
		</div>
	)
}
