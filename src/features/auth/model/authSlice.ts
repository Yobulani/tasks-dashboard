import type { User } from '@/entities/user'
import type { RootState } from '@/store/store'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { LOCALSTORAGE_AUTH_KEY } from '../constants/localStorageKey'

const storedUser = localStorage.getItem(LOCALSTORAGE_AUTH_KEY)

type AuthState = {
	isAuthenticated: boolean
	user: User | null
}

const initialState: AuthState = {
	user: storedUser ? JSON.parse(storedUser) : null,
	isAuthenticated: Boolean(storedUser)
}

const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, { payload }: PayloadAction<User>) => {
			state.isAuthenticated = true
			state.user = payload
		},
		logout: state => {
			state.isAuthenticated = false
			state.user = null
		}
	}
})

export const selectAuthenticated = (state: RootState) =>
	state.auth.isAuthenticated

export const selectCurrentUser = (state: RootState) => state.auth.user

export const selectUserRole = (state: RootState) =>
	selectCurrentUser(state)?.role

export const { login, logout } = AuthSlice.actions
export const { reducer: AuthReducer } = AuthSlice
