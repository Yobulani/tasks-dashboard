import { useGetTasksQuery } from '@/entities/task'
import { TaskFormDialog } from '@/features/task-form'
import { TaskList } from '@/widgets/TaskList/ui/TaskList'

const TasksPage = () => {
	const { isLoading, isError, data: tasks } = useGetTasksQuery()

	if (isLoading) {
		return <div className='p-8'>Loading...</div>
	}

	if (isError) {
		return <div className='p-8 text-red-500'>Oops...</div>
	}

	return (
		<div className='p-8'>
			<h1 className='text-2xl font-bold text-gray-600 mb-6'>Задачи</h1>
			<TaskFormDialog></TaskFormDialog>
			<div className='space-y-3'>
				<TaskList tasks={tasks}></TaskList>
			</div>
		</div>
	)
}

export default TasksPage
