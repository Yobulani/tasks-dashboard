import { ProjectFormDialog } from './ProjectFormDialog'
import { renderWithProviders } from '@/test/utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('./ProjectForm', () => ({
	ProjectForm: ({ onSuccess }: { onSuccess?: () => void }) => (
		<button
			type='button'
			data-testid='project-form'
			onClick={() => onSuccess?.()}
		>
			ProjectForm
		</button>
	)
}))

const mockTrigger = <button data-testid='trigger'></button>

describe('ProjectFormDialog', () => {
	it('Должен быть закрыт по умолчанию', () => {
		renderWithProviders(<ProjectFormDialog trigger={mockTrigger} />)

		expect(
			screen.queryByRole('heading', { name: 'Создать проект' })
		).not.toBeInTheDocument()
	})

	it('Должен открывать диалог при клике на внешний триггер', async () => {
		const user = userEvent.setup()

		renderWithProviders(<ProjectFormDialog trigger={mockTrigger} />)

		await user.click(screen.getByTestId('trigger'))

		expect(
			await screen.findByRole('heading', { name: 'Создать проект' })
		).toBeInTheDocument()
		expect(screen.getByTestId('project-form')).toBeInTheDocument()
	})

	it('Должен закрыть диалог при вызове onSuccess из формы', async () => {
		const user = userEvent.setup()

		renderWithProviders(<ProjectFormDialog trigger={mockTrigger} />)

		await user.click(screen.getByTestId('trigger'))

		const formStub = await screen.findByTestId('project-form')
		await user.click(formStub)

		await waitFor(() => {
			expect(
				screen.queryByRole('heading', { name: 'Создать проект' })
			).not.toBeInTheDocument()
		})
	})
})
