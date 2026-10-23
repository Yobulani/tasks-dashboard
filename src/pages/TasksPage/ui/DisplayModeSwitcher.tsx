import { Button } from '@/components/ui/button'
import { KanbanSquare, LayoutList } from 'lucide-react'
import { memo, useCallback } from 'react'

export type DisplayMode = 'dashboard' | 'list'

interface DisplayModeSwitcher {
	setDisplayMode: (mode: DisplayMode) => void
	displayMode: DisplayMode
}

export const DisplayModeSwitcher = memo(
	({ displayMode, setDisplayMode }: DisplayModeSwitcher) => {
		const setDashboardView = useCallback(
			() => setDisplayMode('dashboard'),
			[setDisplayMode]
		)
		const setListView = useCallback(
			() => setDisplayMode('list'),
			[setDisplayMode]
		)

		return (
			<div className='flex bg-muted p-1 rounded-md'>
				<Button
					variant='ghost'
					onClick={setDashboardView}
					size='sm'
					className={
						displayMode === 'dashboard'
							? 'bg-background shadow-sm hover:bg-background'
							: 'hover:bg-transparent cursor-pointer'
					}
				>
					<KanbanSquare /> Доска
				</Button>
				<Button
					variant='ghost'
					onClick={setListView}
					size='sm'
					className={
						displayMode === 'list'
							? 'bg-background shadow-sm hover:bg-background'
							: 'hover:bg-transparent cursor-pointer'
					}
				>
					<LayoutList /> Список
				</Button>
			</div>
		)
	}
)
