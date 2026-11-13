import {
	useCreateProjectMutation,
	useUpdateProjectMutation,
	type Project
} from '@/entities/project'
import { UserSelect } from '@/entities/user'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/shared/ui'
import { ProjectFormSchema, type ProjectFormValues } from '../model/schema'

interface ProjectFormProps {
	initialValue?: Project
	onSuccess?: () => void
}

export const ProjectForm = ({ initialValue, onSuccess }: ProjectFormProps) => {
	const [createProject, { isLoading: isProjectCreating }] =
		useCreateProjectMutation()
	const [updateProject, { isLoading: isProjectUpdating }] =
		useUpdateProjectMutation()

	const isLoading = isProjectCreating || isProjectUpdating

	const isEditMode = Boolean(initialValue)

	const {
		register,
		handleSubmit,
		control,
		formState: { errors }
	} = useForm<ProjectFormValues>({
		resolver: zodResolver(ProjectFormSchema),
		defaultValues: initialValue
			? {
					name: initialValue.name,
					description: initialValue.description,
					ownerId: initialValue.ownerId
				}
			: {
					name: '',
					description: '',
					ownerId: ''
				}
	})

	const onSubmit = async (data: ProjectFormValues) => {
		try {
			if (initialValue) {
				await updateProject({
					id: initialValue.id,
					...data
				}).unwrap()
			} else {
				await createProject(data).unwrap()
			}

			onSuccess?.()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<form
			className='space-y-4'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<FormField
					label='Название'
					error={errors.name?.message}
				>
					<Input
						className='form-admin-control'
						{...register('name')}
						placeholder='Например: мобильное приложение'
					/>
				</FormField>
			</div>
			<div>
				<FormField
					label='Описание'
					error={errors.description?.message}
				>
					<Textarea
						className='form-admin-control'
						{...register('description')}
						rows={3}
					/>
				</FormField>
			</div>
			<div>
				<Controller
					name='ownerId'
					control={control}
					render={({ field }) => (
						<FormField
							label='Владелец'
							error={errors.ownerId?.message}
						>
							<UserSelect
								value={field.value}
								onChange={value => field.onChange(value ?? '')}
							></UserSelect>
						</FormField>
					)}
				></Controller>
			</div>

			<button
				type='submit'
				disabled={isLoading}
				className='w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-300 text-white py-2 rounded-md font-medium transition-colors'
			>
				{isEditMode ? 'Сохранить' : 'Создать'}
			</button>
		</form>
	)
}
