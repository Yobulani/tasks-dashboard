import type { RootState } from '@/store/store'
import { createSlice } from '@reduxjs/toolkit'
import { THEME_LOCALSTORAGE_KEY } from '../constants/ThemeKey'

export type Theme = 'dark' | 'light'

const initialState: { theme: Theme } = {
	theme: (localStorage.getItem(THEME_LOCALSTORAGE_KEY) as Theme) || 'light'
}

const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		switchTheme: state => {
			state.theme === 'light' ? (state.theme = 'dark') : (state.theme = 'light')
		}
	}
})

export const selectTheme = (state: RootState) => state.theme.theme

export const { reducer: ThemeReducer } = themeSlice

export const { switchTheme } = themeSlice.actions
