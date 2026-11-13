import {
	PrioritySelect,
	StatusSelect,
	useCreateTaskMutation,
	useUpdateTaskMutation,
	type Task
} from '@/entities/task'
import { Controller, useForm } from 'react-hook-form'
import { taskFormSchema, type TaskFormValues } from '../../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { UserSelect } from '@/entities/user'
import { ProjectSelect } from './ProjectSelect'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FormField } from '@/shared/ui'
import { Button } from '@/components/ui/button'

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
					<Input
						{...register('title')}
						placeholder='Например: написать тесты'
					/>
				</FormField>
			</div>
			<div>
				<FormField
					label='Описание'
					error={errors.description?.message}
				>
					<Textarea
						{...register('description')}
						rows={3}
					/>
				</FormField>
			</div>

			<div className='grid grid-cols-2 gap-4'>
				<div>
					<FormField
						label='Статус'
						error={errors.status?.message}
					>
						<Controller
							name='status'
							control={control}
							render={({ field }) => (
								<StatusSelect
									className='w-full'
									value={field.value}
									onChange={v => field.onChange(v)}
									placeholder='Выберите статус'
								></StatusSelect>
							)}
						/>
					</FormField>
				</div>
				<div>
					<FormField
						label='Приоритет'
						error={errors.priority?.message}
					>
						<Controller
							name='priority'
							control={control}
							render={({ field }) => (
								<PrioritySelect
									className='w-full'
									value={field.value}
									onChange={v => field.onChange(v)}
									placeholder='Выберите приоритет'
								></PrioritySelect>
							)}
						/>
					</FormField>
				</div>
			</div>

			<div>
				<Controller
					name='assigneeId'
					control={control}
					render={({ field }) => (
						<FormField
							label='Пользователь'
							error={errors.assigneeId?.message}
						>
							<UserSelect
								value={field.value}
								onChange={value => field.onChange(value)}
							></UserSelect>
						</FormField>
					)}
				></Controller>
			</div>
			<div>
				<Controller
					name='projectId'
					control={control}
					render={({ field }) => (
						<FormField
							label='Проект'
							error={errors.projectId?.message}
						>
							<ProjectSelect
								value={field.value}
								onChange={value => field.onChange(value)}
							></ProjectSelect>
						</FormField>
					)}
				></Controller>
			</div>

			<Button
				type='submit'
				size='lg'
				variant='action'
				disabled={isLoading}
				className='w-full'
			>
				{isLoading ? 'Сохранение...' : isEditMode ? 'Сохранить' : 'Создать'}
			</Button>
		</form>
	)
}
