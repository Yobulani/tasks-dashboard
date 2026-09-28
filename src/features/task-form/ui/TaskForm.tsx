import {
	useCreateTaskMutation,
	useUpdateTaskMutation,
	type Task
} from '@/entities/task'
import { Controller, useForm } from 'react-hook-form'
import { taskFormSchema, type TaskFormValues } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	TASK_PRIORITY_OPTIONS,
	TASK_STATUS_OPTIONS
} from '@/shared/constants/task'
import { UserSelect } from './UserSelect'
import { ProjectSelect } from './ProjectSelect'
import { FormField } from '@/shared/ui/FormField'

interface TaskFormProps {
	initialValue?: Task
	onSuccess?: () => void
}

export const TaskForm = ({ initialValue, onSuccess }: TaskFormProps) => {
	const [createTask, { isLoading: isCreating }] = useCreateTaskMutation()
	const [updateTask, { isLoading: isEditing }] = useUpdateTaskMutation()

	const isEditMode = Boolean(initialValue)
	const isLoading = isCreating || isEditing

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<TaskFormValues>({
		resolver: zodResolver(taskFormSchema),
		defaultValues: initialValue
			? {
					title: initialValue.title,
					description: initialValue.description,
					priority: initialValue.priority,
					status: initialValue.status,
					projectId: initialValue.projectId,
					assigneeId: initialValue.assigneeId
				}
			: {
					title: '',
					description: '',
					priority: 'medium',
					status: 'todo',
					projectId: '',
					assigneeId: null
				}
	})

	const onSubmit = async (taskData: TaskFormValues) => {
		try {
			if (initialValue) {
				await updateTask({
					id: initialValue.id,
					...taskData
				}).unwrap()
			} else {
				await createTask(taskData).unwrap()
			}

			reset()
			onSuccess?.()
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='space-y-4'
		>
			<div>
				<FormField
					label='Название'
					error={errors.title?.message}
				>
					<input
						className='form-control'
						{...register('title')}
						placeholder='Например: написать тесты'
					></input>
				</FormField>
			</div>
			<div>
				<FormField
					label='Описание'
					error={errors.description?.message}
				>
					<textarea
						className='form-control'
						{...register('description')}
						rows={3}
					></textarea>
				</FormField>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<FormField
						label='Статус'
						error={errors.status?.message}
					>
						<select
							className='form-control'
							{...register('status')}
						>
							{TASK_STATUS_OPTIONS.map(status => (
								<option
									value={status.value}
									key={status.value}
								>
									{status.label}
								</option>
							))}
						</select>
					</FormField>
				</div>
				<div>
					<FormField
						label='Приоритет'
						error={errors.priority?.message}
					>
						<select
							{...register('priority')}
							className='form-control'
						>
							{TASK_PRIORITY_OPTIONS.map(priority => (
								<option
									value={priority.value}
									key={priority.value}
								>
									{priority.label}
								</option>
							))}
						</select>
					</FormField>
				</div>
			</div>

			<div>
				<Controller
					name='assigneeId'
					control={control}
					render={({ field }) => (
						<UserSelect
							value={field.value}
							onChange={value => field.onChange(value)}
						></UserSelect>
					)}
				></Controller>
				{errors.assigneeId && (
					<p className='text-sm text-red-500 mt-1'>
						{errors.assigneeId.message}
					</p>
				)}
			</div>
			<div>
				<Controller
					name='projectId'
					control={control}
					render={({ field }) => (
						<ProjectSelect
							value={field.value}
							onChange={value => field.onChange(value)}
						></ProjectSelect>
					)}
				></Controller>
				{errors.projectId && (
					<p className='text-sm text-red-500 mt-1'>
						{errors.projectId.message}
					</p>
				)}
			</div>

			<button
				type='submit'
				disabled={isLoading}
				className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 rounded-md font-medium transition-colors'
			>
				{isLoading ? 'Сохранение...' : isEditMode ? 'Сохранить' : 'Создать'}
			</button>
		</form>
	)
}
