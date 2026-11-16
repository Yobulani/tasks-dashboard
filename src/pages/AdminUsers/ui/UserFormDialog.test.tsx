import { UserFormDialog } from './UserFormDialog'
import { renderWithProviders } from '@/test/utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('./UserForm', () => ({
	UserForm: ({ onSuccess }: { onSuccess?: () => void }) => (
		<button
			type='button'
			data-testid='user-form'
			onClick={() => onSuccess?.()}
		>
			UserForm
		</button>
	)
}))

const mockTrigger = <button data-testid='trigger'></button>

describe('UserFormDialog', () => {
	it('Должен быть закрыт по умолчанию', () => {
		renderWithProviders(<UserFormDialog trigger={mockTrigger} />)

		expect(
			screen.queryByRole('heading', { name: 'Создать пользователя' })
		).not.toBeInTheDocument()
	})

	it('Должен открывать диалог при клике на внешний триггер', async () => {
		const user = userEvent.setup()

		renderWithProviders(<UserFormDialog trigger={mockTrigger} />)

		await user.click(screen.getByTestId('trigger'))

		expect(
			await screen.findByRole('heading', { name: 'Создать пользователя' })
		).toBeInTheDocument()
		expect(screen.getByTestId('user-form')).toBeInTheDocument()
	})

	it('Должен закрыть диалог при вызове onSuccess из формы', async () => {
		const user = userEvent.setup()

		renderWithProviders(<UserFormDialog trigger={mockTrigger} />)

		await user.click(screen.getByTestId('trigger'))

		const formStub = await screen.findByTestId('user-form')
		await user.click(formStub)

		await waitFor(() => {
			expect(
				screen.queryByRole('heading', { name: 'Создать пользователя' })
			).not.toBeInTheDocument()
		})
	})
})
