import {
	TASK_PRIORITY_OPTIONS,
	TASK_STATUS_OPTIONS
} from '@/shared/constants/task'
import type { TaskFiltersState } from '../model/useFilteredTask'
import { Button } from '@/components/ui/button'

interface TaskFiltersProps {
	filters: TaskFiltersState
	onChange: (filters: TaskFiltersState) => void
}

export const TaskFilters = ({ filters, onChange }: TaskFiltersProps) => {
	const updateFilter = (key: keyof TaskFiltersState, value: string) =>
		onChange({ ...filters, [key]: value })

	const resetFilters = () => onChange({ search: '', priority: '', status: '' })

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
				onChange={e => updateFilter('status', e.target.value)}
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
				onChange={e => updateFilter('priority', e.target.value)}
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
