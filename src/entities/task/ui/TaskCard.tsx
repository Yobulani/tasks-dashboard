import type { Task } from '../model/types'
import { memo, type ReactNode } from 'react'

interface TaskCardProps {
	task: Task
	assigneeName?: string
	projectName?: string
	actions?: ReactNode
}

export const TaskCard = memo(
	({ task, actions, assigneeName, projectName }: TaskCardProps) => {
		return (
			<div className='bg-card text-card-foreground p-4 rounded-lg border border-border shadow-sm'>
				<div>
					<h3 className='font-semibold text-foreground'>{task.title}</h3>
					<p className='text-sm text-muted-foreground'>{task.description}</p>
					<p>Исполнитель: {assigneeName ?? 'Исполнитель не назначен'}</p>
					<p>Проект: {projectName ?? 'Проект не назначен'}</p>
					<span className='inline-block mt-2 text-xs px-2 py-1 rounded bg-card text-primary'>
						{task.status}
					</span>
				</div>
				{actions && <div className='flex gap-2'>{actions}</div>}
			</div>
		)
	}
)
