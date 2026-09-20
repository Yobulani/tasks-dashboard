import { AuthPersistenceMiddleware } from '@/app/middleware/AuthPersistenceMiddleware'
import { AuthReducer } from '@/features/auth'
import { baseApi } from '@/shared/api/baseApi'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		[baseApi.reducerPath]: baseApi.reducer
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.prepend(AuthPersistenceMiddleware.middleware)
			.concat(baseApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
