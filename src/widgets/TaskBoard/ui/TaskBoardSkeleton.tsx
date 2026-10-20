import { TaskCardSkeletonList } from '@/entities/task'

export const TaskBoardSkeleton = () => {
	return (
		<div className='grid grid-cols-3 gap-4'>
			{Array.from({ length: 3 }).map((_, i) => (
				<div
					key={i}
					className='flex flex-col gap-3 p-4 rounded-lg bg-muted/30 border border-transparent min-h-75'
				>
					<TaskCardSkeletonList></TaskCardSkeletonList>
				</div>
			))}
		</div>
	)
}
