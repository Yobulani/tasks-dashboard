import { DeleteProjectButton } from './DeleteProjectButton'
import { renderWithProviders } from '@/test/utils'
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockRemoveProject = vi.fn()

vi.mock('@/entities/project', async importOriginal => {
	const actual = await importOriginal<typeof import('@/entities/project')>()

	return {
		...actual,
		useRemoveProjectMutation: () => [mockRemoveProject, { isLoading: false }]
	}
})

const mockTrigger = <span data-testid='trigger'></span>
const mockProject = {
	id: '123',
	name: 'Старый проект',
	description: 'Описание',
	ownerId: '1',
	taskCount: 3
}

describe('DeleteProjectButton', () => {
	beforeEach(() => {
		vi.clearAllMocks()

		mockRemoveProject.mockReturnValue({ unwrap: () => Promise.resolve({ id: 1 }) })
	})

	it('Должен открыть алерт удаления при клике на триггер, отправлять мутацию removeProject при подтверждении и закрывать алерт при успехе', async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<DeleteProjectButton
				project={mockProject}
				trigger={mockTrigger}
			/>
		)

		await user.click(screen.getByTestId('trigger'))

		const confirmButton = await screen.findByRole('button', { name: 'Удалить' })
		await user.click(confirmButton)

		await waitFor(() => {
			expect(mockRemoveProject).toHaveBeenCalledOnce()
			expect(mockRemoveProject).toHaveBeenCalledWith(mockProject.id)

			expect(
				screen.queryByRole('button', { name: 'Удалить' })
			).not.toBeInTheDocument()
		})
	})

	it('не должен вызывать мутацию при отмене', async () => {
		const user = userEvent.setup()

		renderWithProviders(
			<DeleteProjectButton
				project={mockProject}
				trigger={mockTrigger}
			/>
		)

		await user.click(screen.getByTestId('trigger'))

		const cancelButton = await screen.findByRole('button', { name: 'Отмена' })
		await user.click(cancelButton)

		expect(mockRemoveProject).not.toHaveBeenCalled()
	})
})
