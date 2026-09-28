import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks'
import { selectTheme, switchTheme } from '../model/themeSlice'
import { Moon, Sun } from 'lucide-react'

export const SwitchThemeButton = () => {
	const theme = useAppSelector(selectTheme)
	const dispatch = useAppDispatch()

	return (
		<Button
			variant='ghost'
			size='icon'
			onClick={() => dispatch(switchTheme())}
		>
			{theme === 'light' ? <Sun className='w-5 h-5'></Sun> : <Moon></Moon>}
		</Button>
	)
}
