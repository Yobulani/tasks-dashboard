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
import { UserFormSchema, type UserFormValues } from '../model/schema'
import { Button } from '@/components/ui/button'

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
			<FormField
				label='Имя'
				error={errors.name?.message}
			>
				<Input
					{...register('name')}
					placeholder='Иван Иванов'
				/>
			</FormField>

			<FormField
				label='E-mail'
				error={errors.email?.message}
			>
				<Input
					{...register('email')}
					placeholder='ivan@ivan.com'
				/>
			</FormField>

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

			<Button
				type='submit'
				disabled={isLoading}
				className='w-full'
				variant='action'
				size='lg'
			>
				{isEditMode ? 'Сохранить' : 'Создать'}
			</Button>
		</form>
	)
}
