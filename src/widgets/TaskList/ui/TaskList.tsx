import { Button } from '@/components/ui/button'
import { TaskCard, type Task } from '@/entities/task'
import { DeleteTaskButton } from '@/features/delete-task'
import { TaskFormDialog } from '@/features/task-form'

interface TaskListProps {
	tasks?: Task[]
}

export const TaskList = ({ tasks }: TaskListProps) => {
	return (
		<div className='flex flex-col gap-4'>
			{tasks?.map(task => (
				<TaskCard
					key={task.id}
					task={task}
					actions={
						<>
							<TaskFormDialog
								trigger={<Button>Редактировать</Button>}
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
