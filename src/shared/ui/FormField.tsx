import type { ReactNode } from 'react'

interface FormFieldProps {
	children: ReactNode
	label: string
	error?: string
}

export const FormField = ({ children, label, error }: FormFieldProps) => {
	return (
		<label className='block'>
			<span className='block text-sm font-medium text-foreground mb-2'>
				{label}
			</span>
			{children}
			{error && <p className='text-sm text-red-500 mt-1'>{error}</p>}
		</label>
	)
}
