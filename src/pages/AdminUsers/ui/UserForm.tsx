import {
	useCreateUserMutation,
	UserRoleSelect,
	useUpdateUserMutation,
	type User
} from '@/entities/user'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { FormField } from '@/shared/ui'
import {
	UserFormSchema,
	type UserFormValues
} from '../../../pages/AdminUsers/model/schema'

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
				<FormField
					label='Имя'
					error={errors.name?.message}
				>
					<Input
						className='form-admin-control'
						{...register('name')}
						placeholder='Иван Иванов'
					/>
				</FormField>
			</div>
			<div>
				<FormField
					label='E-mail'
					error={errors.email?.message}
				>
					<Input
						className='form-admin-control'
						{...register('email')}
						placeholder='ivan@ivan.com'
					/>
				</FormField>
			</div>
			<div>
				<FormField
					label='Роль'
					error={errors.role?.message}
				>
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
				</FormField>
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
