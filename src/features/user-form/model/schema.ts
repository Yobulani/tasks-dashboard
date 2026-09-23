import { USER_ROLES } from '@/shared/constants/user'
import z from 'zod'

export const UserFormSchema = z.object({
	name: z
		.string()
		.min(3, { error: 'Минимум 3 символа' })
		.max(100, { error: 'Максимум 100 символов' }),
	email: z.email('Введите e-mail').min(1, { error: 'Введите e-mail' }),
	role: z.enum(USER_ROLES)
})

export type UserFormValues = z.infer<typeof UserFormSchema>
