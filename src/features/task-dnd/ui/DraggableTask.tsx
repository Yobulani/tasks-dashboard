import { Button } from '@/components/ui/button'
import { TaskCard, type Task } from '@/entities/task'
import { useDraggable } from '@dnd-kit/core'
import { GripVertical } from 'lucide-react'
import type { ReactNode } from 'react'

interface DraggableTaskProps {
	task: Task
	assigneeName?: string
	projectName?: string
	actions?: ReactNode
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
			className={`flex gap-2 items-start ${isDragging ? 'opacity-50' : ''}`}
			ref={setNodeRef}
		>
			<Button
				className='cursor-grab active:cursor-grabbing p-1 mt-4 text-muted-foreground hover:text-foreground transition-colors'
				size='icon'
				aria-label='Перетащить задачу'
				type='button'
				{...listeners}
				{...attributes}
			>
				<GripVertical></GripVertical>
			</Button>

			<div className='flex-1'>
				<TaskCard
					task={task}
					assigneeName={assigneeName}
					projectName={projectName}
					actions={actions}
				></TaskCard>
			</div>
		</div>
	)
}
