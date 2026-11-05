import {
	TASK_PRIORITY_OPTIONS,
	TASK_STATUS_OPTIONS,
	type TaskPriority,
	type TaskStatus
} from '@/shared/constants'
import type { TaskFiltersState } from '../model/useFilteredTask'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { useAppSelector } from '@/shared/lib'
import { selectCurrentUser } from '@/entities/user'

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
			<input
				className='form-control'
				placeholder='Поиск по названию'
				value={filters.search}
				onChange={e => updateFilter('search', e.target.value)}
				type='text'
			></input>
			<select
				className='form-control'
				value={filters.status}
				onChange={e => updateFilter('status', e.target.value as TaskStatus)}
			>
				<option value=''>Все статусы</option>

				{TASK_STATUS_OPTIONS.map(status => (
					<option
						value={status.value}
						key={status.value}
					>
						{status.label}
					</option>
				))}
			</select>
			<select
				className='form-control'
				value={filters.priority}
				onChange={e => updateFilter('priority', e.target.value as TaskPriority)}
			>
				<option value=''>Все приоритеты</option>

				{TASK_PRIORITY_OPTIONS.map(priority => (
					<option
						value={priority.value}
						key={priority.value}
					>
						{priority.label}
					</option>
				))}
			</select>

			<div className='flex gap-2 items-center shrink-0 cursor-pointer'>
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
