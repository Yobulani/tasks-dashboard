import { Button } from '@/components/ui/button'
import { useGetProjectsQuery } from '@/entities/project'
import { TaskCardSkeletonList, useGetTasksQuery } from '@/entities/task'
import { useGetUsersQuery } from '@/entities/user'
import {
	TaskFilters,
	useFilteredTasks,
	type TaskFiltersState
} from '@/features/task-filters'
import { TaskFormDialog } from '@/features/task-form'
import { useMap } from '@/shared/lib/useMap'
import { TaskBoard, TaskBoardSkeleton } from '@/widgets/TaskBoard'
import { TaskList } from '@/widgets/TaskList/ui/TaskList'
import { KanbanSquare, LayoutList } from 'lucide-react'
import { useDeferredValue, useState } from 'react'

const TasksPage = () => {
	const { data: users } = useGetUsersQuery()
	const { data: projects } = useGetProjectsQuery()
	const usersMap = useMap(users, 'id')
	const projectsMap = useMap(projects, 'id')
	const [displayMode, setDisplayMode] = useState<'list' | 'dashboard'>(
		'dashboard'
	)
	const { isLoading, isError, data: tasks } = useGetTasksQuery()
	const [filters, setFilters] = useState<TaskFiltersState>({
		search: '',
		priority: '',
		status: ''
	})

	const filteredTasks = useFilteredTasks(tasks, filters)

	const deferredTasks = useDeferredValue(filteredTasks)

	const content =
		displayMode === 'list' ? (
			<TaskList
				usersMap={usersMap}
				projectsMap={projectsMap}
				tasks={deferredTasks}
			></TaskList>
		) : (
			<TaskBoard
				tasks={deferredTasks}
				usersMap={usersMap}
				projectsMap={projectsMap}
			></TaskBoard>
		)
	const skeleton =
		displayMode === 'list' ? (
			<TaskCardSkeletonList></TaskCardSkeletonList>
		) : (
			<TaskBoardSkeleton></TaskBoardSkeleton>
		)

	if (isError) {
		return <div className='p-8 text-red-500'>Oops...</div>
	}

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold mb-6'>Задачи</h1>
			<div className='flex items-start gap-4 bg-muted p-1 rounded-md'>
				<Button
					className='px-3'
					onClick={() => setDisplayMode('dashboard')}
					size='sm'
				>
					<KanbanSquare /> Дашборд
				</Button>
				<Button
					className='px-3'
					onClick={() => setDisplayMode('list')}
					size='sm'
				>
					<LayoutList /> Список
				</Button>
			</div>

			<TaskFilters
				filters={filters}
				onChange={setFilters}
			></TaskFilters>

			<TaskFormDialog></TaskFormDialog>

			<div>{isLoading ? skeleton : content}</div>
		</div>
	)
}

export default TasksPage
