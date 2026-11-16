import { ProjectForm } from './ProjectForm'
import { renderWithProviders } from '@/test/utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockCreateProject = vi.fn()
const mockUpdateProject = vi.fn()

const mockOnSuccess = vi.fn()

vi.mock('@/entities/project', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/project')>()

	return {
		...actual,
		useCreateProjectMutation: () => [mockCreateProject, { isLoading: false }],
		useUpdateProjectMutation: () => [mockUpdateProject, { isLoading: false }]
	}
})

vi.mock('@/entities/user', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/user')>()

	return {
		...actual,
		UserSelect: ({
			value,
			onChange
		}: {
			value: string | null
			onChange: (value: string | null) => void
		}) => (
			<button
				type='button'
				data-testid='owner-select'
				onClick={() => onChange('1')}
			>
				{value || 'Выбрать владельца'}
			</button>
		)
	}
})

describe('ProjectForm', () => {
	beforeEach(() => {
		vi.clearAllMocks()

		mockCreateProject.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
		mockUpdateProject.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
	})

	it('Должен вызывать мутацию createProject при корректных данных', async () => {
		const user = userEvent.setup()

		renderWithProviders(<ProjectForm onSuccess={mockOnSuccess}></ProjectForm>)

		await user.type(
			screen.getByPlaceholderText(/мобильное приложение/i),
			'Новый проект'
		)
		await user.type(
			screen.getByRole('textbox', { name: /описание/i }),
			'Описание проекта'
		)
		await user.click(screen.getByTestId('owner-select'))

		await user.click(screen.getByRole('button', { name: /создать/i }))

		await waitFor(() => {
			expect(mockCreateProject).toHaveBeenCalledOnce()
			expect(mockCreateProject).toHaveBeenCalledWith({
				name: 'Новый проект',
				description: 'Описание проекта',
				ownerId: '1'
			})
			expect(mockOnSuccess).toHaveBeenCalled()
		})
	})

	it('Должен вызывать мутацию updateProject при корректных данных', async () => {
		const user = userEvent.setup()

		const mockProject = {
			id: '123',
			name: 'Старый проект',
			description: 'Описание',
			ownerId: '1',
			taskCount: 3
		}

		renderWithProviders(
			<ProjectForm
				initialValue={mockProject}
				onSuccess={mockOnSuccess}
			></ProjectForm>
		)

		await user.click(screen.getByRole('button', { name: /сохранить/i }))

		await waitFor(() => {
			expect(mockUpdateProject).toHaveBeenCalledOnce()
			expect(mockUpdateProject).toHaveBeenCalledWith({
				id: '123',
				name: 'Старый проект',
				description: 'Описание',
				ownerId: '1'
			})
			expect(mockOnSuccess).toHaveBeenCalled()
		})
	})

	it('Должен показать ошибку валидации при отправке с пустыми полями', async () => {
		const user = userEvent.setup()

		renderWithProviders(<ProjectForm onSuccess={mockOnSuccess}></ProjectForm>)

		await user.click(screen.getByRole('button', { name: /создать/i }))

		await waitFor(() => {
			expect(screen.getByText('Минимум 3 символа')).toBeInTheDocument()
			expect(mockCreateProject).not.toHaveBeenCalled()
			expect(mockOnSuccess).not.toHaveBeenCalled()
		})
	})
})
