import { useGetProjectsQuery } from '@/entities/project'
import { TaskCardSkeletonList, useGetTasksQuery } from '@/entities/task'
import { useGetUsersQuery } from '@/entities/user'
import {
	TaskFilters,
	useFilteredTasks,
	type TaskFiltersState
} from '@/features/task-filters'
import { TaskFormDialog } from './dialogs/TaskFormDialog'
import { useMap } from '@/shared/lib'
import { TaskBoard } from './board/TaskBoard'
import { TaskBoardSkeleton } from './board/TaskBoardSkeleton'
import { useDeferredValue, useState } from 'react'
import { DisplayModeSwitcher, type DisplayMode } from './DisplayModeSwitcher'
import { useSearchParams } from 'react-router-dom'
import { TaskList } from './list/TaskList'

const Tasks = () => {
	const [searchParams] = useSearchParams()
	const projectId = searchParams.get('projectId')

	const { data: users } = useGetUsersQuery()
	const { data: projects } = useGetProjectsQuery()
	const { isLoading, isError, data: tasks } = useGetTasksQuery()

	const usersMap = useMap(users, 'id')
	const projectsMap = useMap(projects, 'id')

	const [displayMode, setDisplayMode] = useState<DisplayMode>('dashboard')
	const [filters, setFilters] = useState<TaskFiltersState>({
		search: '',
		priority: '',
		status: '',
		assigneeId: null,
		projectId: projectId ?? null
	})

	const deferredFilters = useDeferredValue(filters)
	const filteredTasks = useFilteredTasks(tasks, deferredFilters)

	const content =
		displayMode === 'list' ? (
			<TaskList
				usersMap={usersMap}
				projectsMap={projectsMap}
				tasks={filteredTasks}
			></TaskList>
		) : (
			<TaskBoard
				tasks={filteredTasks}
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
			<div className='flex flex-col gap-4 mb-6'>
				<div className='flex items-center justify-between'>
					<TaskFormDialog></TaskFormDialog>

					<DisplayModeSwitcher
						displayMode={displayMode}
						setDisplayMode={setDisplayMode}
					></DisplayModeSwitcher>
				</div>

				<div className='flex flex-wrap gap-3 items-center'>
					<TaskFilters
						filters={filters}
						onChange={setFilters}
					></TaskFilters>
				</div>
			</div>

			<div>{isLoading ? skeleton : content}</div>
		</div>
	)
}

export default Tasks
