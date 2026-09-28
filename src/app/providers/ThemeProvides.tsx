import { selectTheme } from '@/features/theme'
import { useAppSelector } from '@/shared/lib/hooks'
import { useEffect, type ReactNode } from 'react'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const theme = useAppSelector(selectTheme)

	useEffect(() => {
		document.documentElement.classList.toggle('dark', theme === 'dark')
	}, [theme])

	return <>{children}</>
}
