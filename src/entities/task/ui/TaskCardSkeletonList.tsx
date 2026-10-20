import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface TaskCardSkeletonList {
	count?: number
}

export const TaskCardSkeletonList = ({ count = 3 }: TaskCardSkeletonList) => {
	return (
		<div className='space-y-3'>
			{Array.from({ length: count }).map((_, i) => (
				<Card
					key={i}
					className='w-full max-w-xs'
				>
					<CardHeader>
						<Skeleton className='h-4 w-2/3' />
						<Skeleton className='h-4 w-1/2' />
					</CardHeader>
					<CardContent>
						<Skeleton className='aspect-video w-full' />
					</CardContent>
				</Card>
			))}
		</div>
	)
}
