import { UserForm } from './UserForm'
import { renderWithProviders } from '@/test/utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockCreateUser = vi.fn()
const mockUpdateUser = vi.fn()

const mockOnSuccess = vi.fn()

vi.mock('@/entities/user', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/user')>()

	return {
		...actual,
		useCreateUserMutation: () => [mockCreateUser, { isLoading: false }],
		useUpdateUserMutation: () => [mockUpdateUser, { isLoading: false }]
	}
})

describe('UserForm', () => {
	beforeEach(() => {
		vi.clearAllMocks()

		mockCreateUser.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
		mockUpdateUser.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
	})

	it('Должен вызывать мутацию createUser при корректных данных', async () => {
		const user = userEvent.setup()

		renderWithProviders(<UserForm onSuccess={mockOnSuccess}></UserForm>)

		await user.type(screen.getByPlaceholderText(/иван иванов/i), 'Пётр Петров')
		await user.type(
			screen.getByPlaceholderText(/ivan@ivan\.com/i),
			'petr@petrov.com'
		)

		await user.click(screen.getByRole('button', { name: /создать/i }))

		await waitFor(() => {
			expect(mockCreateUser).toHaveBeenCalledOnce()
			expect(mockCreateUser).toHaveBeenCalledWith({
				name: 'Пётр Петров',
				email: 'petr@petrov.com',
				role: 'user'
			})
			expect(mockOnSuccess).toHaveBeenCalled()
		})
	})

	it('Должен вызывать мутацию updateUser при корректных данных', async () => {
		const user = userEvent.setup()

		const mockUser = {
			id: '123',
			name: 'Иван Иванов',
			email: 'ivan@ivan.com',
			role: 'user' as const
		}

		renderWithProviders(
			<UserForm
				initialValue={mockUser}
				onSuccess={mockOnSuccess}
			></UserForm>
		)

		await user.click(screen.getByRole('button', { name: /сохранить/i }))

		await waitFor(() => {
			expect(mockUpdateUser).toHaveBeenCalledOnce()
			expect(mockUpdateUser).toHaveBeenCalledWith({
				id: '123',
				name: 'Иван Иванов',
				email: 'ivan@ivan.com',
				role: 'user'
			})
			expect(mockOnSuccess).toHaveBeenCalled()
		})
	})

	it('Должен показать ошибку валидации при отправке с пустыми полями', async () => {
		const user = userEvent.setup()

		renderWithProviders(<UserForm onSuccess={mockOnSuccess}></UserForm>)

		await user.click(screen.getByRole('button', { name: /создать/i }))

		await waitFor(() => {
			expect(screen.getByText('Минимум 3 символа')).toBeInTheDocument()
			expect(mockCreateUser).not.toHaveBeenCalled()
			expect(mockOnSuccess).not.toHaveBeenCalled()
		})
	})
})
