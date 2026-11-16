import { fireEvent, screen, waitFor } from '@testing-library/react'
import { TaskForm } from './TaskForm'
import { renderWithProviders } from '@/test/utils'

const mockCreateTask = vi.fn()
const mockUpdateTask = vi.fn()

const mockOnSuccess = vi.fn()

vi.mock('@/entities/task', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/task')>()

	return {
		...actual,
		useCreateTaskMutation: () => [mockCreateTask, { isLoading: false }],
		useUpdateTaskMutation: () => [mockUpdateTask, { isLoading: false }]
	}
})

vi.mock('@/entities/user', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/user')>()

	return {
		...actual,
		UserSelect: () => <div>UserSelect</div>
	}
})

vi.mock('@/entities/project', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/project')>()

	return {
		...actual,
		ProjectSelect: ({
			value,
			onChange
		}: {
			value: string
			onChange: (v: string) => void
		}) => (
			<button
				type='button'
				data-testid='project-select'
				onClick={() => onChange('1')}
			>
				{value || 'Выбрать проект'}
			</button>
		)
	}
})

describe('TaskForm', () => {
	beforeEach(() => {
		vi.clearAllMocks()

		mockCreateTask.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
		mockUpdateTask.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
	})

	it('Должен вызывать мутацию createTask при корректных данных', async () => {
		renderWithProviders(<TaskForm onSuccess={mockOnSuccess}></TaskForm>)

		fireEvent.change(screen.getByPlaceholderText(/Например: написать тесты/i), {
			target: { value: 'Новая задача' }
		})

		fireEvent.click(screen.getByTestId('project-select'), {
			target: { value: '1' }
		})

		fireEvent.click(screen.getByRole('button', { name: /создать/i }))

		await waitFor(() => {
			expect(mockCreateTask).toHaveBeenCalledOnce()
			expect(mockCreateTask).toHaveBeenCalledWith({
				title: 'Новая задача',
				description: '',
				status: 'todo',
				priority: 'medium',
				projectId: '1',
				assigneeId: null
			})
			expect(mockOnSuccess).toHaveBeenCalled()
		})
	})

	it('Должен вызывать мутацию updateTask при корректных данных', async () => {
		const mockTask = {
			id: '123',
			title: 'Старая задача',
			description: 'Описание',
			status: 'todo' as const,
			priority: 'medium' as const,
			projectId: '1',
			assigneeId: null
		}

		renderWithProviders(
			<TaskForm
				initialValue={{ ...mockTask, createdAt: '2026-01-01' }}
				onSuccess={mockOnSuccess}
			></TaskForm>
		)

		fireEvent.click(screen.getByRole('button', { name: /сохранить/i }))

		await waitFor(() => {
			expect(mockUpdateTask).toHaveBeenCalledOnce()
			expect(mockUpdateTask).toHaveBeenCalledWith(mockTask)
			expect(mockOnSuccess).toHaveBeenCalled()
		})
	})

	it('Должен показать ошибку валидации при вызове с пустым названием', async () => {
		renderWithProviders(<TaskForm onSuccess={mockOnSuccess}></TaskForm>)

		fireEvent.click(screen.getByRole('button', { name: /создать/i }))

		await waitFor(() => {
			expect(screen.getByText('Минимум 3 символа')).toBeInTheDocument
			expect(mockCreateTask).not.toHaveBeenCalled()
			expect(mockOnSuccess).not.toHaveBeenCalled()
		})
	})
})
