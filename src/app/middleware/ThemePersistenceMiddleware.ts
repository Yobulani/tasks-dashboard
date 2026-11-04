import {
	selectTheme,
	switchTheme,
	THEME_LOCALSTORAGE_KEY
} from '@/features/theme'

import { createListenerMiddleware } from '@reduxjs/toolkit'
import type { RootState } from '../store/types'

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
