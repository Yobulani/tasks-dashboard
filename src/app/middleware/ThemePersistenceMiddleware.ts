import { selectTheme, switchTheme } from '@/features/theme'
import { THEME_LOCALSTORAGE_KEY } from '@/features/theme/constants/ThemeKey'
import type { RootState } from '@/store/store'
import { createListenerMiddleware } from '@reduxjs/toolkit'

export const ThemePersistenceMiddleware = createListenerMiddleware()

ThemePersistenceMiddleware.startListening({
	actionCreator: switchTheme,
	effect: (_action, listenerApi) => {
		localStorage.setItem(
			THEME_LOCALSTORAGE_KEY,
			selectTheme(listenerApi.getState() as RootState)
		)
	}
})
