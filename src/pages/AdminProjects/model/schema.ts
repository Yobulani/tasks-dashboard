import z from 'zod'

export const ProjectFormSchema = z.object({
	name: z
		.string()
		.min(3, { error: 'Минимум 3 символа' })
		.max(100, { error: 'Максимум 100 символов' }),
	description: z
		.string()
		.min(1, { error: 'Введите описание' })
		.max(500, { error: 'Максимум 500 символов' }),
	ownerId: z.string().min(1, { error: 'Укажите владельца' })
})

export type ProjectFormValues = z.infer<typeof ProjectFormSchema>
