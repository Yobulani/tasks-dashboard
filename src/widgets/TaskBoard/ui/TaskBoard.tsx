import type { Project } from '@/entities/project'
import { TaskCard, useMoveTaskMutation, type Task } from '@/entities/task'
import type { User } from '@/entities/user'
import { TaskColumn } from '@/features/task-dnd'
import { TASK_STATUS_OPTIONS, type TaskStatus } from '@/shared/constants/task'
import { getById } from '@/shared/lib/getById'
import {
	DndContext,
	DragOverlay,
	type DragEndEvent,
	type DragStartEvent
} from '@dnd-kit/core'
import { useState } from 'react'

interface TaskBoardProps {
	usersMap: Map<string, User>
	projectsMap: Map<string, Project>
	tasks?: Task[]
}

export const TaskBoard = ({ usersMap, projectsMap, tasks }: TaskBoardProps) => {
	const [moveTask] = useMoveTaskMutation()
	const [activeTask, setActiveTask] = useState<Task | null>(null)

	if (!tasks || tasks.length === 0) {
		return <p className='text-foreground-muted'>Задач пока нет</p>
	}

	const handleDragStart = ({ active }: DragStartEvent) => {
		const task = tasks.find(t => t.id === active.id)

		if (task) {
			setActiveTask(task)
		}
	}
	const handleDragEnd = ({ over, active }: DragEndEvent) => {
		setActiveTask(null)

		if (!over) {
			return
		}

		const task = tasks.find(t => t.id === active.id)
		const status = over.id as TaskStatus

		if (task && task.status !== status) {
			moveTask({ id: task.id, status })
		}
	}

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
		>
			<div className='grid grid-cols-3 gap-4'>
				{TASK_STATUS_OPTIONS.map(status => {
					return (
						<TaskColumn
							key={status.value}
							title={status.label}
							tasks={tasks.filter(task => task.status === status.value)}
							projectsMap={projectsMap}
							usersMap={usersMap}
							id={status.value}
						></TaskColumn>
					)
				})}
			</div>

			<DragOverlay dropAnimation={null}>
				{activeTask ? (
					<div>
						<TaskCard
							task={activeTask}
							assigneeName={getById(usersMap, activeTask.assigneeId)?.name}
							projectName={getById(projectsMap, activeTask.projectId)?.name}
							hideStatus
						></TaskCard>
					</div>
				) : null}
			</DragOverlay>
		</DndContext>
	)
}
