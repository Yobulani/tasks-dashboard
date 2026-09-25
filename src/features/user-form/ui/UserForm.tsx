import {
	useCreateUserMutation,
	UserRoleSelect,
	useUpdateUserMutation,
	type User
} from '@/entities/user'
import { Controller, useForm } from 'react-hook-form'
import { UserFormSchema, type UserFormValues } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'

interface UserFormProps {
	initialValue?: User
	onSuccess?: () => void
}

export const UserForm = ({ initialValue, onSuccess }: UserFormProps) => {
	const [createUser, { isLoading: isUserCreating }] = useCreateUserMutation()
	const [updateUser, { isLoading: isUserUpdating }] = useUpdateUserMutation()

	const isLoading = isUserCreating || isUserUpdating

	const isEditMode = Boolean(initialValue)

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors }
	} = useForm<UserFormValues>({
		resolver: zodResolver(UserFormSchema),
		defaultValues: initialValue
			? {
					name: initialValue.name,
					email: initialValue.email,
					role: initialValue.role
				}
			: {
					name: '',
					email: '',
					role: 'user'
				}
	})

	const onSubmit = async (data: UserFormValues) => {
		try {
			if (initialValue) {
				await updateUser({
					id: initialValue.id,
					...data
				}).unwrap()
			} else {
				await createUser(data).unwrap()
			}

			reset()
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
				<label className='mb-1 block font-medium text-sm text-gray-700'>
					Имя
				</label>
				<input
					{...register('name')}
					placeholder='Иван Иванов'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
				></input>
				{errors.name && (
					<p className='mt-1 text-sm text-red-500'>{errors.name.message}</p>
				)}
			</div>
			<div>
				<label className='mb-1 block font-medium text-sm text-gray-700'>
					E-mail
				</label>
				<input
					{...register('email')}
					placeholder='ivan@ivan.com'
					className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500'
				></input>
				{errors.email && (
					<p className='mt-1 text-sm text-red-500'>{errors.email.message}</p>
				)}
			</div>
			<div>
				<label className='mb-1 block font-medium text-sm text-gray-700'>
					Роль
				</label>
				<Controller
					name='role'
					control={control}
					render={({ field }) => (
						<UserRoleSelect
							value={field.value}
							onChange={field.onChange}
						></UserRoleSelect>
					)}
				></Controller>
				{errors.role && (
					<p className='mt-1 text-sm text-red-500'>{errors.role.message}</p>
				)}
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
