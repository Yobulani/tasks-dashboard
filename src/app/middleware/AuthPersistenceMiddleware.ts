import { selectCurrentUser } from '@/entities/user'
import {
	LOCALSTORAGE_AUTH_KEY,
	login,
	logout,
	updateCurrentUser
} from '@/features/auth'
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import type { RootState } from '../store/types'

export const AuthPersistenceMiddleware = createListenerMiddleware()

AuthPersistenceMiddleware.startListening({
	matcher: isAnyOf(login, logout, updateCurrentUser),
	effect: (_action, listenerApi) => {
		const state = listenerApi.getState() as RootState
		const user = selectCurrentUser(state)

		if (user) {
			localStorage.setItem(LOCALSTORAGE_AUTH_KEY, JSON.stringify(user))
		} else {
			localStorage.removeItem(LOCALSTORAGE_AUTH_KEY)
		}
	}
})
