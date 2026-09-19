import { Button } from '@/components/ui/button'
import { useGetProjectsQuery } from '@/entities/project'
import { TaskCard, type Task } from '@/entities/task'
import { useGetUsersQuery } from '@/entities/user'
import { DeleteTaskButton } from '@/features/delete-task'
import { TaskFormDialog } from '@/features/task-form'

interface TaskListProps {
	tasks?: Task[]
}

export const TaskList = ({ tasks }: TaskListProps) => {
	const { data: users } = useGetUsersQuery()
	const { data: projects } = useGetProjectsQuery()

	if (!tasks || tasks.length === 0) {
		return <p className='text-gray-500'>Задач пока нет</p>
	}

	return (
		<div className='flex flex-col gap-4'>
			{tasks.map(task => (
				<TaskCard
					key={task.id}
					task={task}
					assigneeName={users?.find(user => user.id === task.assigneeId)?.name}
					projectName={
						projects?.find(project => project.id === task.projectId)?.name
					}
					actions={
						<>
							<TaskFormDialog
								trigger={<Button variant='ghost'>Редактировать</Button>}
								initialValue={task}
							></TaskFormDialog>
							<DeleteTaskButton task={task}></DeleteTaskButton>
						</>
					}
				></TaskCard>
			))}
		</div>
	)
}
