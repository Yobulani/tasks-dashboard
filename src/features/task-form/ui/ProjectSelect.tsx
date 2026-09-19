import { useGetProjectsQuery } from '@/entities/project'

interface ProjectSelectProps {
	value: string
	onChange: (value: string | null) => void
}

export const ProjectSelect = ({ value, onChange }: ProjectSelectProps) => {
	const { isLoading, data: projects } = useGetProjectsQuery()

	return (
		<>
			<label className='mb-1 block font-medium text-sm text-gray-700'>
				Проект
			</label>
			<select
				value={value ?? ''}
				onChange={e => onChange(e.target.value || null)}
				className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
			>
				<option
					value=''
					disabled
				>
					Выберите проект...
				</option>
				{isLoading
					? 'Загрузка...'
					: projects?.map(project => (
							<option
								value={project.id}
								key={project.id}
							>
								{project.name}
							</option>
						))}
			</select>
		</>
	)
}
