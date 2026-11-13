import { selectTheme } from '@/features/theme'
import { useAppSelector } from '@/shared/lib'
import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
	const theme = useAppSelector(selectTheme)
	const location = useLocation()

	const isAdmin = location.pathname.startsWith('/admin')

	useEffect(() => {
		const root = document.documentElement

		if (theme === 'dark') {
			root.setAttribute('data-theme', theme)
		} else {
			root.removeAttribute('data-theme')
		}

		if (isAdmin) {
			root.setAttribute('data-scope', 'admin')
		} else {
			root.removeAttribute('data-scope')
		}
	}, [theme, isAdmin])

	return <>{children}</>
}
