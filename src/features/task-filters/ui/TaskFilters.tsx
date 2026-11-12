import type { TaskFiltersState } from '../model/useFilteredTasks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { useAppSelector } from '@/shared/lib'
import { selectCurrentUser } from '@/entities/user'
import { PrioritySelect, StatusSelect } from '@/entities/task'

interface TaskFiltersProps {
	filters: TaskFiltersState
	onChange: (filters: TaskFiltersState) => void
}

export const TaskFilters = ({ filters, onChange }: TaskFiltersProps) => {
	const updateFilter = <K extends keyof TaskFiltersState>(
		key: K,
		value: TaskFiltersState[K]
	) => onChange({ ...filters, [key]: value })

	const resetFilters = () =>
		onChange({ ...filters, search: '', priority: '', status: '' })

	const currentUser = useAppSelector(selectCurrentUser)

	return (
		<div className='flex gap-3 mb-6'>
			<div className='grid gap-3 grid-cols-3'>
				<Input
					placeholder='Поиск по названию'
					value={filters.search}
					onChange={e => updateFilter('search', e.target.value)}
					type='text'
				/>
				<StatusSelect
					className='w-full'
					value={filters.status}
					onChange={status => updateFilter('status', status)}
					allowAll
				></StatusSelect>

				<PrioritySelect
					className='w-full'
					value={filters.priority}
					onChange={priority => updateFilter('priority', priority)}
					allowAll
				></PrioritySelect>
			</div>

			<div className='flex gap-2 items-center cursor-pointer'>
				<Switch
					id='only-my-tasks'
					checked={currentUser?.id === filters.assigneeId}
					onCheckedChange={checked =>
						updateFilter(
							'assigneeId',
							checked ? (currentUser?.id ?? null) : null
						)
					}
				></Switch>
				<label htmlFor='only-my-tasks'>Только мои задачи</label>
			</div>

			{(filters.priority || filters.search || filters.status) && (
				<Button
					variant='ghost'
					onClick={resetFilters}
				>
					Очистить
				</Button>
			)}
		</div>
	)
}
