import { ProfileForm } from './ProfileForm'
import { renderWithProviders } from '@/test/utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockUpdateUser = vi.fn()

const mockOnFinish = vi.fn()

vi.mock('@/entities/user', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/user')>()

	return {
		...actual,
		useUpdateUserMutation: () => [mockUpdateUser, { isLoading: false }]
	}
})

const mockCurrentUser = {
	id: '123',
	name: 'Иван Иванов',
	email: 'ivan@ivan.com',
	role: 'user' as const
}

describe('ProfileForm', () => {
	beforeEach(() => {
		vi.clearAllMocks()

		mockUpdateUser.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
	})

	it('Должен вызывать мутацию updateUser при корректных данных', async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<ProfileForm
				currentUser={mockCurrentUser}
				onFinish={mockOnFinish}
			/>
		)

		const nameInput = screen.getByPlaceholderText(/иван иванов/i)
		await user.clear(nameInput)
		await user.type(nameInput, 'Новое имя')

		await user.click(screen.getByRole('button', { name: /сохранить/i }))

		await waitFor(() => {
			expect(mockUpdateUser).toHaveBeenCalledOnce()
			expect(mockUpdateUser).toHaveBeenCalledWith({
				id: '123',
				name: 'Новое имя',
				email: 'ivan@ivan.com',
				avatarUrl: undefined
			})
			expect(mockOnFinish).toHaveBeenCalled()
		})
	})

	it('Должен вызвать onFinish при отмене без вызова мутации', async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<ProfileForm
				currentUser={mockCurrentUser}
				onFinish={mockOnFinish}
			/>
		)

		const nameInput = screen.getByPlaceholderText(/иван иванов/i)
		await user.clear(nameInput)
		await user.type(nameInput, 'Другое имя')

		await user.click(screen.getByRole('button', { name: /отмена/i }))

		expect(mockOnFinish).toHaveBeenCalled()
		expect(mockUpdateUser).not.toHaveBeenCalled()
	})

	it('Должен показать ошибку валидации при коротком имени', async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<ProfileForm
				currentUser={mockCurrentUser}
				onFinish={mockOnFinish}
			/>
		)

		const nameInput = screen.getByPlaceholderText(/иван иванов/i)
		await user.clear(nameInput)
		await user.type(nameInput, '12')

		await user.click(screen.getByRole('button', { name: /сохранить/i }))

		await waitFor(() => {
			expect(screen.getByText('Минимум 3 символа')).toBeInTheDocument()
			expect(mockUpdateUser).not.toHaveBeenCalled()
			expect(mockOnFinish).not.toHaveBeenCalled()
		})
	})
})
