import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { TASK_STATUS_OPTIONS, type TaskStatus } from '@/shared/config'

type StatusSelectProps = {
	value: TaskStatus | ''
	onChange: (value: TaskStatus | '') => void
	allowAll?: boolean
	placeholder?: string
	className?: string
}

export const StatusSelect = ({
	value,
	onChange,
	allowAll,
	placeholder,
	className
}: StatusSelectProps) => {
	const statuses = allowAll
		? [{ value: '', label: 'Все статусы' }, ...TASK_STATUS_OPTIONS]
		: TASK_STATUS_OPTIONS

	return (
		<Select
			items={statuses}
			value={value}
			onValueChange={v => onChange(v ?? '')}
		>
			<SelectTrigger className={className}>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{statuses.map(status => (
					<SelectItem
						value={status.value}
						key={status.value}
					>
						{status.label}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	)
}
