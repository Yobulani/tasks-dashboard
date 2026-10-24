import { Badge } from '@/components/ui/badge'
import type { TaskPriority } from '@/shared/constants/task'
import { ArrowDown, ArrowUp, Minus } from 'lucide-react'

const PRIORITY_CONFIG: Record<
	TaskPriority,
	{ label: string; icon: React.ComponentType; classes: string }
> = {
	low: {
		label: 'Low',
		icon: ArrowDown,
		classes: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
	},
	medium: {
		label: 'Medium',
		icon: Minus,
		classes:
			'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
	},
	high: {
		label: 'High',
		icon: ArrowUp,
		classes: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
	}
}

interface TaskCardPriorityBadgeProps {
	priority: TaskPriority
}

export const TaskCardPriorityBadge = ({
	priority
}: TaskCardPriorityBadgeProps) => {
	const config = PRIORITY_CONFIG[priority]

	return (
		<Badge
			variant='outline'
			className={`${config.classes} gap-1 border-transparent`}
		>
			<config.icon></config.icon>
			{config.label}
		</Badge>
	)
}
