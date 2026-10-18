import type { Project } from '@/entities/project'
import { TaskCard, type Task } from '@/entities/task'
import type { User } from '@/entities/user'
import { TaskActions } from '@/features/task-actions'
import { getById } from '@/shared/lib/getById'

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
		<div className='flex flex-col gap-4'>
			{tasks.map(task => (
				<TaskCard
					key={task.id}
					task={task}
					assigneeName={getById(usersMap, task.assigneeId)?.name}
					projectName={getById(projectsMap, task.projectId)?.name}
					actions={<TaskActions task={task}></TaskActions>}
				></TaskCard>
			))}
		</div>
	)
}
