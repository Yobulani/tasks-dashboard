import { Badge } from '@/components/ui/badge'
import { type TaskStatus } from '@/shared/constants/task'

interface TaskStatusBadgeProps {
	status: TaskStatus
}

const STATUS_CONFIG: Record<
	TaskStatus,
	{ label: string; classes: string; dot: string }
> = {
	todo: {
		label: 'To Do',
		classes:
			'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 border-transparent',
		dot: 'bg-gray-500'
	},
	'in-progress': {
		label: 'In Progress',
		classes:
			'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-transparent',
		dot: 'bg-blue-500'
	},
	done: {
		label: 'Done',
		classes:
			'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-transparent',
		dot: 'bg-green-500'
	}
}

export const TaskStatusBadge = ({ status }: TaskStatusBadgeProps) => {
	const config = STATUS_CONFIG[status]

	return (
		<Badge
			variant='outline'
			className={`${config.classes} gap-1.5`}
		>
			<span className={`rounded-full w-1.5 h-1.5 ${config.dot}`}></span>
			{config.label}
		</Badge>
	)
}
