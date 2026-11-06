import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface TaskFormMenuItemProps {
	onSelect: () => void
}

export const TaskFormMenuItem = ({ onSelect }: TaskFormMenuItemProps) => {
	return (
		<>
			<Button
				variant='ghost'
				className='w-full justify-start gap-2 px-2 py-1.5 h-auto font-normal cursor-pointer'
				onClick={() => onSelect()}
			>
				<Pencil></Pencil>Редактировать
			</Button>
		</>
	)
}
