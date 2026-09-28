import { useGetProjectsQuery } from '@/entities/project'
import { FormField } from '@/shared/ui/FormField'

interface ProjectSelectProps {
	value: string
	onChange: (value: string | null) => void
}

export const ProjectSelect = ({ value, onChange }: ProjectSelectProps) => {
	const { isLoading, data: projects } = useGetProjectsQuery()

	return (
		<FormField label='Проект'>
			<select
				value={value ?? ''}
				onChange={e => onChange(e.target.value || null)}
				className='form-control'
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
		</FormField>
	)
}
