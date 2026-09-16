import { useCreateTaskMutation, type Task } from '@/entities/task'
import { useForm } from 'react-hook-form'
import { taskFormSchema, type TaskFormValues } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	TASK_PRIORITY_OPTIONS,
	TASK_STATUS_OPTIONS
} from '@/shared/constants/task'

interface TaskFormProps {
	initialValue?: Task
	onSuccess?: () => void
}

export const TaskForm = ({ initialValue, onSuccess }: TaskFormProps) => {
	const [createTask, { isLoading: isCreating }] = useCreateTaskMutation()

	const isEditMode = Boolean(initialValue)
	const isLoading = isCreating

	const {
		register,
		handleSubmit,
		reset,
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
			if (isEditMode) {
			}

			await createTask(taskData).unwrap()

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
				<label className='mb-1 block font-medium text-sm text-gray-700'>
					Название
				</label>
				<input
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					{...register('title')}
					placeholder='Например: написать тесты'
				></input>
				{errors.title && (
					<p className='text-sm text-red-500 mt-1'>{errors.title.message}</p>
				)}
			</div>
			<div>
				<label className='mb-1 block font-medium text-sm text-gray-700'>
					Описание
				</label>
				<textarea
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					{...register('description')}
					rows={3}
				></textarea>
				{errors.description && (
					<p className='text-sm text-red-500 mt-1'>
						{errors.description.message}
					</p>
				)}
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<label className='mb-1 block font-medium text-sm text-gray-700'>
						Статус
					</label>
					<select
						className='w-full px-3 py-2 border border-gray-300 rounded-md'
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
				</div>
				<div>
					<label className='mb-1 block font-medium text-sm text-gray-700'>
						Приоритет
					</label>
					<select
						{...register('priority')}
						className='w-full px-3 py-2 border border-gray-300 rounded-md'
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
				</div>
			</div>

			<div>
				<label className='mb-1 block font-medium text-sm text-gray-700'>
					ID проекта
				</label>
				<input
					{...register('projectId')}
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
					placeholder='1'
				></input>
				{errors.projectId && (
					<p className='text-sm text-red-500 mt-1'>
						{errors.projectId.message}
					</p>
				)}
			</div>

			<button
				disabled={isLoading}
				className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 rounded-md font-medium transition-colors'
			>
				{isLoading ? 'Сохранение...' : isEditMode ? 'Сохранить' : 'Создать'}
			</button>
		</form>
	)
}
