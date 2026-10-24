import { FolderIcon, UserIcon } from 'lucide-react'
import type { Task } from '../model/types'
import { memo } from 'react'
import { TaskStatusBadge } from './TaskStatusBadge'
import { TaskCardPriorityBadge } from './TaskCardPriorityBadge'

interface TaskCardProps {
	task: Task
	assigneeName?: string
	projectName?: string
	actions?: React.ComponentType<{ task: Task }>
	hideStatus?: boolean
}

export const TaskCard = memo(
	({
		task,
		assigneeName,
		projectName,
		actions: Actions,
		hideStatus
	}: TaskCardProps) => {
		return (
			<div className='relative bg-card p-4 rounded-lg border border-border shadow-sm hover:border-primary/50 transition-colors'>
				<div>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-1 flex-wrap'>
							<h3 className='font-semibold text-card-foreground'>
								{task.title}
							</h3>
							<TaskCardPriorityBadge
								priority={task.priority}
							></TaskCardPriorityBadge>
						</div>

						{Actions && (
							<div className='flex gap-2'>
								<Actions task={task}></Actions>
							</div>
						)}
					</div>

					{!hideStatus && (
						<div className='mb-2'>
							<TaskStatusBadge status={task.status}></TaskStatusBadge>
						</div>
					)}

					<p className='text-sm text-muted-foreground line-clamp-2 mb-4'>
						{task.description}
					</p>

					<div className='flex flex-col items-start gap-3 text-xs text-muted-foreground'>
						<div className='flex items-center gap-1'>
							<UserIcon className='w-3 h-3' />
							{assigneeName ?? 'Исполнитель не назначен'}
						</div>

						<div className='flex items-center gap-1'>
							<FolderIcon className='w-3 h-3' />
							{projectName ?? 'Проект не назначен'}
						</div>
					</div>
				</div>
			</div>
		)
	}
)
