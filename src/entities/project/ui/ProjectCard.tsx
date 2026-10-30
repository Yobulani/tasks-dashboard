import type { Project } from '../model/types'
import { ArrowRight, FolderKanban, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
	project: Project
	totalTasks: number
	doneTasks: number
	progress: number
	ownerName?: string
}
export const ProjectCard = ({
	progress,
	project,
	totalTasks,
	doneTasks,
	ownerName
}: ProjectCardProps) => {
	return (
		<div className='bg-card text-card-foreground border border-border rounded-xl p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow'>
			<div className='flex items-center gap-3 mb-3'>
				<div className='p-2 bg-primary/10 rounded-lg text-primary'>
					<FolderKanban></FolderKanban>
				</div>

				<h3 className='font-semibold text-lg'>{project.name}</h3>
			</div>

			<p className='text-sm text-muted-foreground line-clamp-2 mb-6'>
				{project.description}
			</p>

			<div className='mt-auto mb-6'>
				<div className='flex justify-between text-xs mb-1.5'>
					<span className='text-muted-foreground'>Прогресс</span>
					<span className='font-medium'>{progress}%</span>
				</div>

				<div className='h-2 w-full bg-muted rounded-full mb-2'>
					<div
						className='h-full bg-primary rounded-full'
						style={{ width: `${progress}%` }}
					></div>
				</div>

				<p className=' text-muted-foreground text-xs'>
					{doneTasks} задач из {totalTasks} Выполнено
				</p>
			</div>

			<div className='pt-4 border-t border-border flex justify-between items-center'>
				<span className='text-xs text-muted-foreground flex items-center gap-1'>
					<Users className='w-3 h-3' />{' '}
					{ownerName ? `Владелец: ${ownerName}` : 'Владелец не назначен'}
				</span>
				<Link
					to={`/tasks?projectId=${project.id}`}
					className='text-sm hover:underline font-medium text-primary flex items-center gap-1'
				>
					К задачам <ArrowRight></ArrowRight>
				</Link>
			</div>
		</div>
	)
}
