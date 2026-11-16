import { ProjectFormSchema } from './schema'

describe('ProjectFormSchema', () => {
	it('Должен пропускать корректные данные', () => {
		const validData = {
			name: 'Новый проект',
			description: 'Описание проекта',
			ownerId: '1'
		}

		const result = ProjectFormSchema.safeParse(validData)

		expect(result.success).toBe(true)
	})

	it('Должен выдавать ошибку, если name короче 3-х символов', () => {
		const invalidData = {
			name: '12',
			description: 'Описание проекта',
			ownerId: '1'
		}

		const result = ProjectFormSchema.safeParse(invalidData)

		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe('Минимум 3 символа')
	})

	it('должен выдавать ошибку, если ownerId пустой', () => {
		const invalidData = {
			name: 'Нормальное название',
			description: 'Описание',
			ownerId: ''
		}

		const result = ProjectFormSchema.safeParse(invalidData)

		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe('Укажите владельца')
	})
})
