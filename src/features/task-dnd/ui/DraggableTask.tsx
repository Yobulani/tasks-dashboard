import { Button } from '@/components/ui/button'
import { TaskCard, type Task } from '@/entities/task'
import { useDraggable } from '@dnd-kit/core'
import { GripVertical } from 'lucide-react'

interface DraggableTaskProps {
	task: Task
	assigneeName?: string
	projectName?: string
	actions?: React.ComponentType<{ task: Task }>
}

export const DraggableTask = ({
	task,
	assigneeName,
	projectName,
	actions
}: DraggableTaskProps) => {
	const { listeners, setNodeRef, attributes, isDragging } = useDraggable({
		id: task.id
	})

	return (
		<div
			className={`relative group ${isDragging ? 'opacity-50 z-50' : ''}`}
			ref={setNodeRef}
		>
			<div
				className='absolute bottom-0 left-0 top-0 w-2 cursor-grab active:cursor-grabbing bg-primary/40 hover:bg-primary transition-colors rounded-l-lg z-10'
				aria-label='Перетащить задачу'
				{...listeners}
				{...attributes}
			></div>

			<div className='flex-1'>
				<TaskCard
					task={task}
					assigneeName={assigneeName}
					projectName={projectName}
					actions={actions}
					hideStatus
				></TaskCard>
			</div>
		</div>
	)
}
