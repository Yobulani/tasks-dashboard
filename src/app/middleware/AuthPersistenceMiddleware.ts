import { LOCALSTORAGE_AUTH_KEY, login, logout } from '@/features/auth'
import { selectCurrentUser } from '@/features/auth/model/authSlice'
import type { RootState } from '@/store/store'
import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'

export const AuthPersistenceMiddleware = createListenerMiddleware()

AuthPersistenceMiddleware.startListening({
	matcher: isAnyOf(login, logout),
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
