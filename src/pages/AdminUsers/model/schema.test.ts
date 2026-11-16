import { UserFormSchema } from './schema'

describe('UserFormSchema', () => {
	it('Должен пропускать корректные данные', () => {
		const validData = {
			name: 'Иван Иванов',
			email: 'ivan@ivan.com',
			role: 'user'
		}

		const result = UserFormSchema.safeParse(validData)

		expect(result.success).toBe(true)
	})

	it('Должен выдавать ошибку, если name короче 3-х символов', () => {
		const invalidData = {
			name: '12',
			email: 'ivan@ivan.com',
			role: 'user'
		}

		const result = UserFormSchema.safeParse(invalidData)

		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe('Минимум 3 символа')
	})

	it('должен выдавать ошибку при некорректном e-mail', () => {
		const invalidData = {
			name: 'Иван Иванов',
			email: 'не-email',
			role: 'user'
		}

		const result = UserFormSchema.safeParse(invalidData)

		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe('Введите e-mail')
	})
})
