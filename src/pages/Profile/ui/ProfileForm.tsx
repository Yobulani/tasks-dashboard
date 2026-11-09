import { useUpdateUserMutation, type User } from '@/entities/user'
import { useForm } from 'react-hook-form'
import { profileSchema, type ProfileFormValues } from '../model/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRef, useState, type ChangeEvent } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Camera } from 'lucide-react'
import { FormField } from '@/shared/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { useAppDispatch } from '@/shared/lib'
import { updateCurrentUser } from '@/features/auth'

const MAX_FILE_SIZE_MB = 2
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

interface ProfileFormProps {
	onFinish: () => void
	currentUser: User
}

export const ProfileForm = ({ onFinish, currentUser }: ProfileFormProps) => {
	const [updateUser, { isLoading }] = useUpdateUserMutation()
	const [preview, setPrevirew] = useState<string | null>(
		currentUser.avatarUrl ?? null
	)
	const fileInputRef = useRef<HTMLInputElement>(null)
	const dispatch = useAppDispatch()

	const {
		register,
		formState: { errors, isDirty },
		handleSubmit,
		setValue,
		reset
	} = useForm<ProfileFormValues>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: currentUser.name,
			email: currentUser.email,
			avatarUrl: currentUser.avatarUrl
		}
	})

	const onSubmit = async (data: ProfileFormValues) => {
		try {
			await updateUser({
				id: currentUser.id,
				...data
			}).unwrap()

			dispatch(updateCurrentUser(data))

			onFinish()

			toast.success('Успешно сохранено')
		} catch (e) {
			toast.error('Не удалось сохранить')
		}
	}

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (!file) {
			return
		}

		if (file.size > MAX_FILE_SIZE) {
			toast.error(`Максимальный размер файла ${MAX_FILE_SIZE_MB}МВ`)
			return
		}

		const fileReader = new FileReader()

		fileReader.onloadend = () => {
			const base64file = fileReader.result as string

			setPrevirew(base64file)
			setValue('avatarUrl', base64file, { shouldDirty: true })
		}

		fileReader.readAsDataURL(file)
	}
	const handleCancel = () => {
		reset()
		onFinish()
	}

	return (
		<div className='max-w-xl mx-auto bg-card border border-border rounded-xl'>
			<div className='p-6 flex flex-col items-center border-b border-border bg-muted/20'>
				<div
					onClick={() => fileInputRef.current?.click()}
					className='relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group border-2 border-background shadow-sm mb-3'
				>
					<Avatar className='w-full h-full'>
						<AvatarImage src={preview || ''} />
						<AvatarFallback className='text-2xl'>
							{currentUser.name[0]}
						</AvatarFallback>
					</Avatar>
					<div className='absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
						<Camera className='w-6 h-6 text-white' />
					</div>
				</div>
				<p className='text-xs text-muted-foreground'>
					Нажмите на фото, чтобы изменить
				</p>
				<Input
					type='file'
					accept='image/*'
					ref={fileInputRef}
					onChange={handleFileChange}
					className='hidden'
				/>
			</div>

			<form
				onSubmit={handleSubmit(onSubmit)}
				className='p-6 space-y-4'
			>
				<div>
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
							placeholder='example@example.com'
						/>
					</FormField>
				</div>

				<div className='flex justify-end gap-3 pt-4 border-t border-border mt-6'>
					<Button
						type='button'
						variant='ghost'
						onClick={handleCancel}
						disabled={isLoading}
					>
						Отмена
					</Button>
					<Button
						type='submit'
						disabled={isLoading || !isDirty}
					>
						{isLoading ? 'Сохранение...' : 'Сохранить'}
					</Button>
				</div>
			</form>
		</div>
	)
}
