import type { Task } from '../model/types'

interface TaskCardProps {
	task: Task
}

export const TaskCard = ({ task }: TaskCardProps) => {
	return (
		<div
			key={task.id}
			className='bg-white p-4 rounded-lg border border-gray-200 shadow-sm'
		>
			<h3 className='font-semibold text-gray-800'>{task.title}</h3>
			<p className='text-sm text-gray-500'>{task.description}</p>
			<span className='inline-block mt-2 text-xs px-2 py-1 rounded bg-blue-100 text-blue-700'>
				{task.status}
			</span>
		</div>
	)
}
