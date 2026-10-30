import { Skeleton } from '@/components/ui/skeleton'
import { useGetProjectsQuery } from '@/entities/project'
import { useGetTasksQuery } from '@/entities/task'
import { ProjectCardItem } from './ui/ProjectCardItem'

const ProjectsPage = () => {
	const { data: projects, isLoading: isProjectsLoading } = useGetProjectsQuery()
	const { data: tasks, isLoading: isTasksLoading } = useGetTasksQuery()

	const isLoading = isProjectsLoading || isTasksLoading

	return (
		<div className='p-8'>
			<p className='mb-6'>Все активные проекты команды</p>

			{isLoading ? (
				<div className='grid grid-cols-2 gap-6'>
					{[1, 2, 3].map(i => (
						<Skeleton
							className='h-64 rounded-lg'
							key={i}
						></Skeleton>
					))}{' '}
				</div>
			) : (
				<div className='grid grid-cols-2 gap-6'>
					{projects?.map(project => (
						<ProjectCardItem
							key={project.id}
							project={project}
							tasks={tasks}
						></ProjectCardItem>
					))}
				</div>
			)}
		</div>
	)
}

export default ProjectsPage
