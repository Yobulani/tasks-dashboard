import { DeleteTaskDialog } from './DeleteTaskDialog'
import { renderWithProviders } from '@/test/utils'
import { fireEvent, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@/entities/task', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/task')>()

	return {
		...actual,
		useRemoveTaskMutation: () => [mockRemoveTask, { isLoading: false }]
	}
})

const mockRemoveTask = vi.fn()

const id = '123'
const mockTrigger = <button data-testid='trigger'></button>
const mockTask = {
	id,
	title: 'Старая задача',
	description: 'Описание',
	status: 'todo' as const,
	priority: 'medium' as const,
	projectId: '1',
	assigneeId: null,
	createdAt: '2020-12-12'
}

describe('DeleteTaskDialog', () => {
	beforeEach(() => {
		vi.clearAllMocks()

		mockRemoveTask.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
	})

	it('Должен открывать алерт удаления при клике на внешний триггер, отправлять мутацию removeTask при подтверждении и закрывать диалог при успехе', async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<DeleteTaskDialog
				trigger={mockTrigger}
				task={mockTask}
			/>
		)

		const triggerButton = screen.getByTestId('trigger')
		await user.click(triggerButton)

		const confirmButton = await screen.findByRole('button', {
			name: /Удалить задачу/i
		})
		await user.click(confirmButton)

		await waitFor(() => {
			expect(mockRemoveTask).toHaveBeenCalledOnce()
			expect(mockRemoveTask).toHaveBeenCalledWith(id)

			expect(
				screen.queryByRole('button', { name: /Удалить задачу/i })
			).not.toBeInTheDocument()
		})
	})

	it('Должен открыть диалог при внешнем open', () => {
		renderWithProviders(
			<DeleteTaskDialog
				open={true}
				task={mockTask}
			></DeleteTaskDialog>
		)

		const removeButton = screen.queryByRole('button', {
			name: /Удалить задачу/i
		})

		expect(removeButton).toBeInTheDocument()
	})

	it('не должен вызывать мутацию при отмене', () => {
		renderWithProviders(
			<DeleteTaskDialog
				task={mockTask}
				open={true}
			/>
		)

		const cancelButton = screen.getByRole('button', { name: /отменить/i })
		fireEvent.click(cancelButton)

		expect(mockRemoveTask).not.toHaveBeenCalled()
	})
})
