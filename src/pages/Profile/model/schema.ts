import z from 'zod'

export const profileSchema = z.object({
	name: z.string().max(50, 'Максимум 50 символов').min(3, 'Минимум 3 символа'),
	email: z.email().min(3, 'Некорректный e-mail'),
	avatarUrl: z.string().optional()
})

export type ProfileFormValues = z.infer<typeof profileSchema>
