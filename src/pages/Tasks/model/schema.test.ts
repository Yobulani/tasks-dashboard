import { taskFormSchema } from './schema'

describe('taskFormSchema', () => {
	it('Должен пропускать корректные данные', () => {
		const validData = {
			title: 'Написать тесты',
			description: 'Это описание',
			status: 'todo',
			priority: 'high',
			assigneeId: '',
			projectId: '1'
		}

		const result = taskFormSchema.safeParse(validData)
		console.log(JSON.stringify(result))
		expect(result.success).toBe(true)
	})

	it('Должен выдавать ошибку, если title короче 3-х символов', () => {
		const validData = {
			title: '12',
			description: 'Это описание',
			status: 'todo',
			priority: 'high',
			assigneeId: '',
			projectId: '1'
		}

		const result = taskFormSchema.safeParse(validData)

		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe('Минимум 3 символа')
	})

	it('должен выдавать ошибку, если projectId пустой', () => {
		const invalidData = {
			title: 'Нормальное название',
			description: '',
			status: 'todo',
			priority: 'low',
			assigneeId: '',
			projectId: ''
		}

		const result = taskFormSchema.safeParse(invalidData)
		expect(result.success).toBe(false)
		expect(result.error?.issues[0].message).toBe('Укажите проект')
	})
})
