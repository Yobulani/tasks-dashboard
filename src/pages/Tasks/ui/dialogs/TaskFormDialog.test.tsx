import { TaskFormDialog } from './TaskFormDialog'
import { renderWithProviders } from '@/test/utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('../form/TaskForm', () => ({
	TaskForm: ({ onSuccess }: { onSuccess?: () => void }) => (
		<button
			type='button'
			data-testid='task-form'
			onClick={() => onSuccess?.()}
		>
			TaskForm
		</button>
	)
}))

const mockTrigger = <button data-testid='trigger'></button>

describe('TaskFormDialog', () => {
	it('Должен быть закрыт по умолчанию', () => {
		renderWithProviders(<TaskFormDialog trigger={mockTrigger} />)

		expect(
			screen.queryByRole('heading', { name: 'Создать задачу' })
		).not.toBeInTheDocument()
	})

	it('Должен открывать диалог при клике на внешний триггер', async () => {
		const user = userEvent.setup()

		renderWithProviders(<TaskFormDialog trigger={mockTrigger} />)

		await user.click(screen.getByTestId('trigger'))

		expect(
			await screen.findByRole('heading', { name: 'Создать задачу' })
		).toBeInTheDocument()
		expect(screen.getByTestId('task-form')).toBeInTheDocument()
	})

	it('Должен закрыть диалог при вызове onSuccess из формы', async () => {
		const user = userEvent.setup()

		renderWithProviders(<TaskFormDialog trigger={mockTrigger} />)

		await user.click(screen.getByTestId('trigger'))

		const formStub = await screen.findByTestId('task-form')
		await user.click(formStub)

		await waitFor(() => {
			expect(
				screen.queryByRole('heading', { name: 'Создать задачу' })
			).not.toBeInTheDocument()
		})
	})

	it('Должен открыть диалог при внешнем open', () => {
		renderWithProviders(<TaskFormDialog open={true} />)

		expect(
			screen.getByRole('heading', { name: 'Создать задачу' })
		).toBeInTheDocument()
	})
})
