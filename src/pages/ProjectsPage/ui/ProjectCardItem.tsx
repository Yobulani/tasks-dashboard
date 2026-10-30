import { ProjectCard, type Project } from '@/entities/project'
import type { Task } from '@/entities/task'
import { useGetUsersQuery } from '@/entities/user'
import { useProjectStats } from '@/features/project-stats'
import { memo } from 'react'

interface ProjectCardItemProps {
	project: Project
	tasks?: Task[]
}
export const ProjectCardItem = memo(
	({ project, tasks }: ProjectCardItemProps) => {
		const { data: users } = useGetUsersQuery()

		const ownerName = users?.find(user => user.id === project.id)?.name
		const { done, progress, total } = useProjectStats(tasks, project.id)

		return (
			<ProjectCard
				project={project}
				ownerName={ownerName}
				doneTasks={done}
				progress={progress}
				totalTasks={total}
			></ProjectCard>
		)
	}
)
