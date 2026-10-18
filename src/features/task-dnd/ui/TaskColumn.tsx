import type { Project } from '@/entities/project'
import type { Task } from '@/entities/task'
import type { User } from '@/entities/user'
import { DraggableTask } from './DraggableTask'
import { getById } from '@/shared/lib/getById'
import { TaskActions } from '@/features/task-actions'
import { useDroppable } from '@dnd-kit/core'

interface TaskColumnProps {
	id: string
	projectsMap: Map<string, Project>
	usersMap: Map<string, User>
	tasks: Task[]
	title: string
}

export const TaskColumn = ({
	projectsMap,
	usersMap,
	title,
	tasks,
	id
}: TaskColumnProps) => {
	const { setNodeRef, isOver } = useDroppable({ id })

	return (
		<div
			className={`flex flex-col gap-3 p-4 rounded-lg bg-muted/30 border border-transparent min-h-75 transition-colors ${isOver ? 'bg-muted60 border-primary' : ''}`}
			ref={setNodeRef}
		>
			<h3 className='font-semibold text-foreground flex justify-between items-center'>
				{title}
				<span className='text-sm font-normal text-muted-foreground bg-background px-2 py-0.5 rounded-full'>
					Задач: {tasks.length}
				</span>
			</h3>
			<div className='space-y-3'>
				{tasks.map(task => (
					<DraggableTask
						key={task.id}
						task={task}
						projectName={getById(projectsMap, task.projectId)?.name}
						assigneeName={getById(usersMap, task.assigneeId)?.name}
						actions={<TaskActions task={task}></TaskActions>}
					></DraggableTask>
				))}
			</div>
		</div>
	)
}
