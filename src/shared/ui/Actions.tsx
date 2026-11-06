import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { memo, type ReactNode } from 'react'

interface ActionsProps {
	children: ReactNode
}

export const Actions = memo(({ children }: ActionsProps) => {
	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger
					render={
						<Button
							variant='ghost'
							size='icon'
						>
							<MoreVertical></MoreVertical>
						</Button>
					}
				></DropdownMenuTrigger>

				<DropdownMenuContent
					align='end'
					side='right'
					className='w-48'
				>
					{children}
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
})
