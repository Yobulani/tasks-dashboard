import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { TASK_PRIORITY_OPTIONS, type TaskPriority } from '@/shared/config'

type PrioritySelectProps = {
	value: TaskPriority | ''
	onChange: (value: TaskPriority | '') => void
	allowAll?: boolean
	placeholder?: string
	className?: string
}

export const PrioritySelect = ({
	value,
	onChange,
	allowAll,
	placeholder,
	className
}: PrioritySelectProps) => {
	const priorities = allowAll
		? [{ value: '', label: 'Все приоритеты' }, ...TASK_PRIORITY_OPTIONS]
		: TASK_PRIORITY_OPTIONS

	return (
		<Select
			items={priorities}
			value={value}
			onValueChange={v => onChange(v ?? '')}
		>
			<SelectTrigger className={className}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{priorities.map(priority => (
					<SelectItem
						value={priority.value}
						key={priority.value}
					>
						{priority.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
