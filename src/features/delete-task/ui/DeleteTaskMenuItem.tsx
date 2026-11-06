import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'

interface DeleteTaskMenuItemProps {
	onSelect: () => void
}
export const DeleteTaskMenuItem = ({ onSelect }: DeleteTaskMenuItemProps) => {
	return (
		<>
			<Button
				variant='ghost'
				className='w-full justify-start gap-2 px-2 py-1.5 h-auto font-normal cursor-pointer text-destructive'
				onClick={() => onSelect()}
			>
				<Trash2></Trash2>Удалить
			</Button>
		</>
	)
}
