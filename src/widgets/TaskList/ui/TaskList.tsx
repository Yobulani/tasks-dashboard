import { Button } from '@/components/ui/button'
import { useGetProjectsQuery } from '@/entities/project'
import { TaskCard, type Task } from '@/entities/task'
import { useGetUsersQuery } from '@/entities/user'
import { DeleteTaskButton } from '@/features/delete-task'
import { TaskFormDialog } from '@/features/task-form'
import { useMap } from '@/shared/lib/useMap'
import { TaskActions } from './TaskActions'

interface TaskListProps {
	tasks?: Task[]
}

export const TaskList = ({ tasks }: TaskListProps) => {
	const { data: users } = useGetUsersQuery()
	const { data: projects } = useGetProjectsQuery()
	const usersMap = useMap(users, 'id')
	const projectsMap = useMap(projects, 'id')

	if (!tasks || tasks.length === 0) {
		return <p className='text-foreground-muted'>Задач пока нет</p>
	}

	return (
		<div className='flex flex-col gap-4'>
			{tasks.map(task => (
				<TaskCard
					key={task.id}
					task={task}
					assigneeName={
						task.assigneeId ? usersMap.get(task.assigneeId)?.name : ''
					}
					projectName={projectsMap.get(task.projectId)?.name}
					actions={<TaskActions task={task}></TaskActions>}
				></TaskCard>
			))}
		</div>
	)
}
