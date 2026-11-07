import type { Project } from '@/entities/project'
import type { Task } from '@/entities/task'
import type { User } from '@/entities/user'
import { getById } from '@/shared/lib'
import { TaskListItem } from './TaskListItem'

interface TaskListProps {
	tasks?: Task[]
	usersMap: Map<string, User>
	projectsMap: Map<string, Project>
}

export const TaskList = ({ tasks, usersMap, projectsMap }: TaskListProps) => {
	if (!tasks || tasks.length === 0) {
		return <p className='text-foreground-muted'>Задач пока нет</p>
	}

	return (
		<div className='flex flex-col gap-4 p-4'>
			{tasks.map(task => (
				<TaskListItem
					key={task.id}
					task={task}
					assigneeName={getById(usersMap, task.assigneeId)?.name}
					projectName={getById(projectsMap, task.projectId)?.name}
				></TaskListItem>
			))}
		</div>
	)
}
