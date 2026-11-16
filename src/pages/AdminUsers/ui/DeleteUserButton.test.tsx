import { DeleteUserButton } from './DeleteUserButton'
import { renderWithProviders } from '@/test/utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockRemoveUser = vi.fn()

vi.mock('@/entities/user', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/user')>()

	return {
		...actual,
		useRemoveUserMutation: () => [mockRemoveUser, { isLoading: false }]
	}
})

const mockTrigger = <span data-testid='trigger'></span>
const mockUser = {
	id: '123',
	name: 'Иван Иванов',
	email: 'ivan@ivan.com',
	role: 'user' as const
}

describe('DeleteUserButton', () => {
	beforeEach(() => {
		vi.clearAllMocks()

		mockRemoveUser.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
	})

	it('Должен открыть алерт удаления при клике на триггер, отправлять мутацию removeUser при подтверждении и закрывать алерт при успехе', async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<DeleteUserButton
				user={mockUser}
				trigger={mockTrigger}
			/>
		)

		await user.click(screen.getByTestId('trigger'))

		const confirmButton = await screen.findByRole('button', { name: 'Удалить' })
		await user.click(confirmButton)

		await waitFor(() => {
			expect(mockRemoveUser).toHaveBeenCalledOnce()
			expect(mockRemoveUser).toHaveBeenCalledWith(mockUser.id)

			expect(
				screen.queryByRole('button', { name: 'Удалить' })
			).not.toBeInTheDocument()
		})
	})

	it('не должен вызывать мутацию при отмене', async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<DeleteUserButton
				user={mockUser}
				trigger={mockTrigger}
			/>
		)

		await user.click(screen.getByTestId('trigger'))

		const cancelButton = await screen.findByRole('button', { name: 'Отмена' })
		await user.click(cancelButton)

		expect(mockRemoveUser).not.toHaveBeenCalled()
	})
})
